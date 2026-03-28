import styles from './TrendChart.module.css';
import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import type { Device } from '../../types/common';

const API_URL = import.meta.env.VITE_API_URL;
interface TrendChartProps {
  selectedMeter: Device | null;
  startDate?: Date | null;
  endDate?: Date | null;
  meterId?: string;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 1025;
const height = isMobile ? 200 : 350;

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

    fetchTrendData(meterId, start, end);
  }, [startDate, endDate, meterId]);

  async function fetchTrendData(meterId: string, start: Date, end: Date) {
    const startFormat = start.toISOString();
    const endFormat = end.toISOString();
    try {
      const response = await fetch(
        `${API_URL}/measurements/trend?meter_id=${meterId}&start=${startFormat}&end=${endFormat}&limit=500`,
      );
      const raw = await response.json();
      const datas = raw.data;
      const formatted = datas.map((item: any) => ({
        time: new Date(item.measurement_time),
        volt: Number(item.volts_ave),
        current: Number(item.current_sum),
        power: Number(item.watts_sum),
      }))
      .reverse();
      console.log(formatted);
      setChartData(formatted);
    } catch (error) {
      console.error('Trend fetch error: ', error);
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
            <span>Volt Ave</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.green}`}></span>
            <span>Current Sum</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.orange}`}></span>
            <span>Power Sum</span>
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
              margin={{ top: 10, right: 30, left: 57, bottom: 60 }}
              /*margin={{ top: 10, right: 60, left: 20, bottom: 0 }}*/
            >
              <XAxis
                dataKey="time"
                angle={-30}
                textAnchor="end"
                minTickGap={50}
                tick={{
                  fontSize: 11,
                  fill: '#888',
                }}
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

              <YAxis hide />

              <Tooltip
                formatter={(value, name) => {
                  const formattedName =
                    name === 'volt' ? 'Volt' : name === 'current' ? 'Current' : 'Power';
                  return [`${value}`, formattedName];
                }}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleString('th-TH');
                }}
              />
              {/* เส้นกราฟ 3 สีตามในรูป */}
              <Line type="monotone" dataKey="volt" stroke="#604CC3" strokeWidth={5} dot={false} />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#8FD14F"
                strokeWidth={5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="power"
                stroke="#FF6600"
                strokeWidth={5}
                dot={false}
                // activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrendChart;
