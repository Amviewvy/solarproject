import React, { useEffect, useState } from 'react';
import styles from './TrendChart.module.css';
import { Card, CardContent } from './../ui/card';
import TrendHeader from './TrendHeader';
import TrendChart from './TrendChart';
import type { Device } from '../../types/common';

const API_URL = import.meta.env.VITE_API_URL;
interface TrendCardProps {
  startDate?: Date | null;
  endDate?: Date | null;
  meterId?: number;
  baseUrl?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  startDate,
  endDate,
  //meterId,
}) => {
  const [selectedMeter, setSelectedMeter] = useState<Device | null>(null);
  const [meters, setMeters] = useState<Device[]>([]);

  async function fetchDevice() {
    try {
      const response = await fetch(`${API_URL}/devices?device_type=meter`);
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      const result = await response.json();
      const devices = result.result;
      if (devices.length > 0) {
        setMeters(devices);
        setSelectedMeter(devices[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDevice();
  }, []);

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.leftSection}>
          <TrendHeader
            selectedMeter={selectedMeter}
            setSelectedMeter={setSelectedMeter}
            meters={meters}
          />
        </div>

        <div className={styles.rightSection}>
          <TrendChart
            selectedMeter={selectedMeter}
            startDate={startDate}
            endDate={endDate}
            meterId={selectedMeter?.id}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
