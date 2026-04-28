import React, { useState, useEffect } from 'react';
import styles from '../styles/TrendChart.module.css';
import { Card, CardContent } from './ui/card';
import TrendHeader from './TrendHeader';
import TrendChart from './TrendChart';
import type { DataTrendChart } from '../types/common';

interface TrendCardProps {
  startDate: Date | null;
  endDate: Date | null;
  meterId: string | undefined;
  baseUrl: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ startDate, endDate, meterId, baseUrl }) => {
  const [selectedTrend, setSelectedTrend] = useState('Volts');
  const [dataTrend, setDataTrend] = useState<DataTrendChart[]>([]);
  const [value, setValue] = useState<DataTrendChart>({
    ts: '',
    Volts1: 0,
    Volts2: 0,
    Volts3: 0,
    Current1: 0,
    Current2: 0,
    Current3: 0,
    W1: 0,
    W2: 0,
    W3: 0,
    VA1: 0,
    VA2: 0,
    VA3: 0,
    VAR1: 0,
    VAR2: 0,
    VAR3: 0,
  });
  const [up] = useState<string>('--');

  async function fetchDataMeterWithSelectedValue() {
    if (!meterId || !endDate || !startDate) return;

    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    // const start = startDate.toLocaleDateString();
    // const endISO = end.toLocaleDateString();
    const start = startDate.toISOString();
    const endISO = end.toISOString();

    try {
      const res = await fetch(
        `${baseUrl}/telemetry?device_id=${meterId}&register_names=Volts 1,Volts 2,Volts 3,Current 1,Current 2,Current 3,W1,W2,W3,VA1,VA2,VA3,VAR1,VAR2,VAR3&limit=144000&start=${start}&end=${endISO}`,
      );
      const rawJson = await res.json();
      if (rawJson.length == 0) {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        } ${date.getHours().toString().padStart(2, '0')}:${date
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

        const dumpData = {
          ts: formattedDate,
          Volts1: 0,
          Volts2: 0,
          Volts3: 0,
          Current1: 0,
          Current2: 0,
          Current3: 0,
          W1: 0,
          W2: 0,
          W3: 0,
          VA1: 0,
          VA2: 0,
          VA3: 0,
          VAR1: 0,
          VAR2: 0,
          VAR3: 0,
        };
        setValue(dumpData);
        setDataTrend([dumpData, dumpData]);
        return;
      } else {
        const formatted: DataTrendChart[] = rawJson.map((item: any) => {
          const date = new Date(item.ts);

          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          } ${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;

          return {
            ts: formattedDate,

            Volts1: item['Volts 1'] ?? 0,
            Volts2: item['Volts 2'] ?? 0,
            Volts3: item['Volts 3'] ?? 0,

            Current1: item['Current 1'] ?? 0,
            Current2: item['Current 2'] ?? 0,
            Current3: item['Current 3'] ?? 0,

            W1: Number(item['W1']) ?? 0,
            W2: Number(item['W2']) ?? 0,
            W3: Number(item['W3']) ?? 0,

            VA1: item['VA1'] ?? 0,
            VA2: item['VA2'] ?? 0,
            VA3: item['VA3'] ?? 0,

            VAR1: item['VAR1'] ?? 0,
            VAR2: item['VAR2'] ?? 0,
            VAR3: item['VAR3'] ?? 0,
          };
        });
        setValue(formatted[0]);
        setDataTrend(formatted);
      }
    } catch (error) {
      console.error(error);
      setDataTrend([]);
    }
  }

  useEffect(() => {
    fetchDataMeterWithSelectedValue();
  }, [meterId, startDate, endDate]);

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.leftSection}>
          <TrendHeader selectedTrend={selectedTrend} setSelectedTrend={setSelectedTrend} />
        </div>

        <div className={styles.rightSection}>
          <TrendChart selectedTrend={selectedTrend} data={dataTrend} value={value} up={up} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
