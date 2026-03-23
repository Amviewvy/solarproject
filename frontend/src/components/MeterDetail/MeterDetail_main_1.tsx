'use client';
import React, { useEffect, useState } from 'react';
import styles from './MeterDetail_main_1.module.css';
import SmallEarnings from '../total_average.tsx';
import DateRangePicker from '../Calendar_DateRangePicker';
import MediumTraffic from '../energy_use';
import type { DeviceWithTrendData } from '../../types/common.ts';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import type { ChartTrafficData } from '../../types/common';

interface trendCardData {
  icon: string;
  label: string;
  value: number;
  iconColor: string;
}
interface MeterDetail_main_1Props {
  dateRange: { from: Date | null; to: Date | null };
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
}
const apiUrl: string = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL;
interface dataCardDashboard {
  icon: string;
  label: string;
  value: number;
  iconColor: string;
}

const MeterDetail_main_1: React.FC<MeterDetail_main_1Props> = ({ onDateRangeChange }) => {
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
  const [data, setData] = useState<trendCardData[]>([]);
  const { id } = useParams<{ id: string }>();
  const [trafficData, setTrafficData] = useState<ChartTrafficData>({
    import: [],
    export: [],
  });

  async function fetchTrafficData() {
    try {
      const res = await fetch(`${API_URL}/measurements/energy-consumption?device_id=${id}`);
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

  async function fetchTrendDataByIdMeter() {
    try {
      const response = await fetch(`${apiUrl}/devices/trend-latest?device_ids=${id}`);
      const rawJson = await response.json();
      const result: DeviceWithTrendData = rawJson.data[0];
      const formatData = [
        {
          icon: 'V',
          label: 'Average Voltage (Volt)',
          value: result.volts_ave,
          iconColor: 'iconGreen',
        },
        {
          icon: 'A',
          label: 'Total Current (Amp)',
          value: result.current_sum,
          iconColor: 'iconRed',
        },
        {
          icon: 'W',
          label: 'Total Power (Watt)',
          value: result.power_sum,
          iconColor: 'iconBlue',
        },
      ];
      setData(formatData);
    } catch (error) {
      console.error('error when fetch trend data: ', error);
    }
  }

  async function fetchTraffic() {
    try {
      const res = await fetch(`${API_URL}/measurements/energy-consumption?device_id=${id}`);
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
    fetchTrendDataByIdMeter();
    const onMeasurementUpdated = () => {
      fetchTrendDataByIdMeter();
    };
    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, []);

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
      <div className={styles.div4}>
        <DateRangePicker onRangeChange={onDateRangeChange} />
      </div>
      <div className={styles.div5}>
        <MediumTraffic fetchData={fetchTraffic} initialData={trafficData} />
      </div>
      <div className={styles.div8} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap' }}>
        {data.map((item, index) => (
          <SmallEarnings
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            iconColor={item.iconColor as 'iconGreen' | 'iconRed' | 'iconBlue'}
          />
        ))}
      </div>
    </div>
  );
};

export default MeterDetail_main_1;
