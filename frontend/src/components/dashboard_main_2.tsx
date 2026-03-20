// src/components/dashboard_main_2.tsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard_main_2.module.css';
import DateRangePicker from './Calendar_DateRangePicker';
import TrendCard from './TrendCard';
import type { Device } from '../types/common';

const API_URL = import.meta.env.VITE_API_URL;
const Dashboard_main_2: React.FC = () => {
  const [mainMeter, setMainMeter] = useState<Device | undefined>();

  async function fetchDevices() {
    try {
      const response = await fetch(`${API_URL}/devices?device_type=meter`);
      const rawJson = await response.json();
      const devices = rawJson.result;
      const mainDevice: Device = devices.find((d: Device) => d.location === 'Main');
      setMainMeter(mainDevice);
    } catch (error) {
      console.error('error at dashboard_main_2: ', error);
    }
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  // useEffect(() => {
  //   console.log('mainmeter: ', mainMeter);
  // }, [mainMeter]);

  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker onRangeChange={setRange} />
      </div>
      <div className={styles.div2}>
        <TrendCard
          startDate={range.from}
          endDate={range.to}
          meterId={mainMeter?.id}
          baseUrl={API_URL}
        />
      </div>
    </div>
  );
};

export default Dashboard_main_2;
