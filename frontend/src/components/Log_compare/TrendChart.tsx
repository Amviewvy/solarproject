import styles from './TrendChart.module.css';
import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Device } from '../../types/common';

const API_URL = import.meta.env.VITE_API_URL;
interface TrendChartProps {
  selectedMeter: Device | null;
  startDate?: Date | null;
  endDate?: Date | null;
  meterId?: string;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 1025;
const height = isMobile ? 200 : 400;

function TrendChart({ startDate, endDate, meterId }: TrendChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!startDate || !endDate || !meterId) return;

    let start = new Date(startDate);
    let end = new Date(endDate);

    // กันเลือกสลับวัน
    if (start > end) {
      [start, end] = [end, start];
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    // fetchTrendData(meterId, start, end);

    fetchTrendData(meterId, start, end);
  }, [startDate, endDate, meterId]);

  async function fetchTrendData(meterId: string, start: Date, end: Date) {
    const startFormat = start.toISOString();
    const endFormat = end.toISOString();

    try {
      const res = await fetch(
        `${API_URL}/telemetry?device_id=${meterId}&register_names=Volts 1,Volts 2,Volts 3&limit=1440&start=${startFormat}&end=${endFormat}`,
      );
      const rawJson = await res.json();
      const formatted = rawJson
        .map((item: any) => ({
          time: new Date(item.ts),
          volts1: Number(item['Volts 1']),
          volts2: Number(item['Volts 2']),
          volts3: Number(item['Volts 3']),
        }))
        .reverse();
      setChartData(formatted);
    } catch (error) {
      console.error('error: ', error);
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.infoBoxOverlay}>
        <p className={styles.status}>
          <span className={styles.dot}></span> On track
        </p>

        {/* Legend แสดงข้อมูล Meter */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.purple}`}></span>
            <span>Volts 1</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.green}`}></span>
            <span>Volts 2</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.orange}`}></span>
            <span>Volts 3</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.scrollWrapper}>
          <div className={styles.chartInner}>
            <LineChart
              width={Math.max(chartData.length * 20, 800)}
              height={height}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
              /*margin={{ top: 10, right: 60, left: 20, bottom: 0 }}*/
            >
              <CartesianGrid stroke="#444" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="time"
                angle={-30}
                textAnchor="end"
                minTickGap={50}
                tick={{ fontSize: 11, fill: '#aaa' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString('th-TH', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }}
              />

              <YAxis
                width={40}
                tick={{ fontSize: 11, fill: '#aaa' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value, name) => {
                  const formattedName =
                    name === 'volts1' ? 'volts1' : name === 'volts2' ? 'volts2' : 'volts3';
                  return [`${value}`, formattedName];
                }}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleString('th-TH');
                }}
              />
              {/* เส้นกราฟ 3 สีตามในรูป */}
              <Line type="monotone" dataKey="volts1" stroke="#604CC3" strokeWidth={5} dot={false} />
              <Line type="monotone" dataKey="volts2" stroke="#8FD14F" strokeWidth={5} dot={false} />
              <Line type="monotone" dataKey="volts3" stroke="#FF6600" strokeWidth={5} dot={false} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrendChart;
