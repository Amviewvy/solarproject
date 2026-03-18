// src/components/MeterDetail_main_1.tsx
'use client';
import React, { useEffect, useState } from 'react';
import styles from './MeterDetail_main_1.module.css';
import SmallEarnings from '../total_average.tsx';
//import EnergyPieChart from '../EnergyPieChart_body';
import DateRangePicker from '../Calendar_DateRangePicker';
//import MediumTraffic from "../energy_use.tsx";
import PredictCard from './PredictCard.tsx';
import type { DeviceWithTrendData } from '../../types/common.ts';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';

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

  // const trafficData = [
  //   { time: '00', value: 133 },
  //   { time: '04', value: 94 },
  //   { time: '08', value: 185 },
  //   { time: '12', value: 116 },
  //   { time: '14', value: 156 },
  //   { time: '16', value: 205 },
  //   { time: '18', value: 55 },
  // ];

  return (
    <div className={styles.parent}>
      <div className={styles.div4}>
        <DateRangePicker onRangeChange={onDateRangeChange} />
      </div>
      <div className={styles.div5}>
        {/*<EnergyPieChart importValue={53} exportValue={34} />*/}
        <PredictCard />
      </div>
      <div className={styles.div6}>{/* <MediumTraffic initialData={trafficData} /> */}</div>
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
