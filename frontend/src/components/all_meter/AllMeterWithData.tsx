import React, { useEffect, useState } from 'react';
import styles from '../../styles/all_meter.module.css';
import MeterCard from './MeterCard';
import type { DeviceWithTrendData } from '../../types/common';
import { socket } from '../../socket';

export interface MeterData {
  // meter_id: number;
  // volts_avg: number;
  // current_sum: number;
  // watt_sum: number;

  meter_id: string;
  meter_name: string;
  avg_voltage: number;
  total_current: number;
  total_power: number;
}

export const fetchMeterData = async (): Promise<DeviceWithTrendData[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/devices/trend-latest`);
  if (!response.ok) {
    throw new Error('Failed to fetch meter summary');
  }
  const data = await response.json();
  const devices = data.data;
  // 🔥 แปลง string → number
  return devices.map((m: DeviceWithTrendData) => ({
    device_id: m.device_id,
    location: m.location,
    device_name: m.device_name,
    volts_ave: m.volts_ave,
    current_sum: m.current_sum,
    power_sum: m.power_sum,
  }));
};

interface Props {
  targetMeterIds?: number[];
}

const AllMeterWithData: React.FC<Props> = ({ targetMeterIds = [] }) => {
  const [meters, setMeters] = useState<DeviceWithTrendData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeterData = async () => {
      try {
        setLoading(true);
        const data = await fetchMeterData();
        setMeters(data);
        setError(null);
      } catch (err) {
        setError('Failed to load meter data');
        console.error('Error fetching meter data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMeterData();

    const onMeasurementUpdated = (payload: any) => {
      console.log('socket event: ', payload);
      loadMeterData();
    };

    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, [targetMeterIds]);

  if (loading) {
    return (
      <div className={styles.parent}>
        <div>Loading meter data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.parent}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      {meters.map((m) => (
        <MeterCard
          key={m.device_id}
          name={m.device_name}
          meterId={m.device_id}
          voltage={m.volts_ave}
          current={m.current_sum}
          power={m.power_sum}
          location={m.location || '-'}
        />
      ))}
    </div>
  );
};

export default AllMeterWithData;
