import styles from '../styles/dashboard_main_1.module.css';
import SmallEarnings from './total_average';
import Usis3d from './usis_3d';
import MediumTraffic from './energy_use';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import type { ChartTrafficData } from '../types/common';

const API_URL = import.meta.env.VITE_API_URL;
interface dataCardDashboard {
  icon: string;
  label: string;
  value: number;
  iconColor: string;
}

function Dashboard_main_1() {
  const [data, setData] = useState<dataCardDashboard[] | undefined>([]);
  const [mainDeviceId, setMainDeviceId] = useState<string>('');
  const [trafficData, setTrafficData] = useState<ChartTrafficData>({
    import: [],
    export: [],
  });

  async function fetchTrafficData() {
    if (mainDeviceId === '') return;

    try {
      const res = await fetch(
        `${API_URL}/measurements/energy-consumption?device_id${mainDeviceId}`,
      );
      const rawJson = await res.json();
      const data_import = rawJson.import.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      const data_export = rawJson.export.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      setTrafficData({
        import: data_import,
        export: data_export,
      });
    } catch (error) {
      console.error('error fetch traffic: ', error);
    }
  }

  async function fetchTraffic() {
    try {
      const res = await fetch(
        `${API_URL}/measurements/energy-consumption?device_id=${mainDeviceId}`,
      );
      const rawJson = await res.json();
      const data_import = rawJson.import.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      const data_export = rawJson.export.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      return { import: data_import, export: data_export };
    } catch (error) {
      console.error('error fetch traffic: ', error);
      return { import: [], export: [] };
    }
  }

  async function fetchTrendData() {
    try {
      const response = await fetch(`${API_URL}/devices/trend-latest`);
      const dataJson = await response.json();
      const devices = dataJson.data;
      if (devices.length > 0) {
        const main_device = devices.find((d: any) => d.location === 'Main');
        setMainDeviceId(main_device.device_id);
        const trendData: dataCardDashboard[] = [
          {
            icon: 'V',
            label: 'Average Voltage (Volt)',
            value: main_device.volts_ave,
            iconColor: 'iconGreen',
          },
          {
            icon: 'A',
            label: 'Total Current (Amp)',
            value: main_device.current_sum,
            iconColor: 'iconRed',
          },

          {
            icon: 'W',
            label: 'Total Power (Watt)',
            value: main_device.power_sum,
            iconColor: 'iconBlue',
          },
        ];
        setData(trendData);
      }
    } catch (error) {
      console.error('Error fetching traffic data: ', error);
    }
  }

  useEffect(() => {
    fetchTrendData();
    const onMeasurementUpdated = () => {
      fetchTrendData();
      fetchTrafficData();
    };

    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, []);

  useEffect(() => {
    fetchTrafficData();
  }, [mainDeviceId]);

  return (
    <div className={styles.parent}>
      <div className={styles.div1} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap' }}>
        {data?.map((item, index) => (
          <SmallEarnings
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            iconColor={item.iconColor as 'iconGreen' | 'iconRed' | 'iconBlue'}
          />
        ))}
      </div>
      <div className={styles.div4}>
        <MediumTraffic fetchData={fetchTraffic} initialData={trafficData} />
        {/* <MediumTraffic fetchData={fetchTrafficData} /> */}
      </div>
      <div className={styles.div5}>
        <Usis3d />
      </div>
    </div>
  );
}

export default Dashboard_main_1;
