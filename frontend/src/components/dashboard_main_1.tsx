import styles from '../styles/dashboard_main_1.module.css';
import SmallEarnings from './total_average';
import Usis3d from './usis_3d';
import MediumTraffic from './energy_use';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import type { TrafficData } from '../types/common';

const API_URL = import.meta.env.VITE_API_URL;
interface dataCardDashboard {
  icon: string;
  label: string;
  value: number;
  iconColor: string;
}

function Dashboard_main_1() {
  const [data, setData] = useState<dataCardDashboard[] | undefined>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  // const data = [
  //   {
  //     icon: 'V',
  //     label: 'Average Voltage (Volt)',
  //     value: 227.957,
  //     iconColor: 'iconGreen',
  //   },
  //   {
  //     icon: 'A',
  //     label: 'Average Current (Amp)',
  //     value: 5.23,
  //     iconColor: 'iconRed',
  //   },
  //   {
  //     icon: 'W',
  //     label: 'Average Power (Watt)',
  //     value: 1200,
  //     iconColor: 'iconBlue',
  //   },
  // ];

  // const trafficData = [
  //   { time: '00', value: 133 },
  //   { time: '01', value: 94 },
  //   { time: '02', value: 94 },
  //   { time: '03', value: 94 },
  //   { time: '04', value: 185 },
  //   { time: '05', value: 185 },
  //   { time: '06', value: 116 },
  //   { time: '07', value: 156 },
  //   { time: '08', value: 205 },
  //   { time: '09', value: 55 },
  //   { time: '10', value: 133 },
  //   { time: '11', value: 94 },
  //   { time: '12', value: 94 },
  //   { time: '13', value: 94 },
  //   { time: '14', value: 185 },
  //   { time: '15', value: 185 },
  //   { time: '16', value: 116 },
  //   { time: '17', value: 156 },
  //   { time: '18', value: 205 },
  //   { time: '19', value: 55 },
  //   { time: '20', value: 116 },
  //   { time: '21', value: 156 },
  //   { time: '22', value: 205 },
  //   { time: '23', value: 55 },
  // ];

  // const fetchTrafficData = async () => {
  //   try {
  //     // ตัวอย่างการเรียก API
  //     const response = await fetch('/api/energy-usage');
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching traffic data:", error);
  //     return []; // return array ว่างถ้า error
  //   }
  // };

  async function fetchTrafficData() {
    try {
      const res = await fetch(`${API_URL}/measurements/energy-consumption`);
      const rawJson = await res.json();
      const data = rawJson.data.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      setTrafficData(data);
    } catch (error) {
      console.error('error fetch traffic: ', error);
    }
  }

  async function fetchTraffic() {
    try {
      const res = await fetch(`${API_URL}/measurements/energy-consumption`);
      const rawJson = await res.json();
      const data = rawJson.data.map((item: any) => ({
        time: item.time,
        value: parseFloat(item.value),
      }));
      return data;
    } catch (error) {
      console.error('error fetch traffic: ', error);
      return [];
    }
  }

  async function fetchTrendData() {
    try {
      const response = await fetch(`${API_URL}/devices/trend-latest`);
      const dataJson = await response.json();
      const devices = dataJson.data;
      if (devices.length > 0) {
        const main_device = devices[0];
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
    fetchTrafficData();
    const onMeasurementUpdated = (payload: any) => {
      console.log('socket event: ', payload);
      fetchTrendData();
      fetchTrafficData();
    };

    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, []);

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
