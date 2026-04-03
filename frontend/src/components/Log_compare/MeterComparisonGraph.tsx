'use client';
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './MeterComparison.module.css';

type CompareSeries = {
  key: string;
  name: string;
};

interface MeterComparisonGraphProps {
  compareData: any;
  mode: 'meter' | 'data';
}

function floorTo10Minutes(ts: string) {
  const date = new Date(ts);
  date.setUTCSeconds(0, 0);

  const minutes = date.getUTCMinutes();
  const flooredMinutes = Math.floor(minutes / 10) * 10;
  date.setUTCMinutes(flooredMinutes);

  return date.toISOString();
}

function normalizeCompareMeterData(rawData: Array<Record<string, any>>, series: CompareSeries[]) {
  const bucketMap = new Map<string, Record<string, any>>();

  for (const row of rawData) {
    const bucketTime = floorTo10Minutes(row.time);

    if (!bucketMap.has(bucketTime)) {
      const base: Record<string, any> = { time: bucketTime };
      for (const s of series) {
        base[s.key] = null;
      }
      bucketMap.set(bucketTime, base);
    }

    const target = bucketMap.get(bucketTime)!;

    for (const key of Object.keys(row)) {
      if (key !== 'time') {
        target[key] = row[key];
      }
    }
  }

  return Array.from(bucketMap.values()).sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
}

const MeterComparisonGraph: React.FC<MeterComparisonGraphProps> = ({ compareData }) => {
  const colors = [
    '#4B0082',
    '#8FD14F',
    '#FF6600',
    '#00BCD4',
    '#9C27B0',
    '#F44336',
    '#3F51B5',
    '#009688',
    '#FFC107',
    '#795548',
    '#607D8B',
    '#E91E63',
  ];

  const chartData = useMemo(() => {
    return normalizeCompareMeterData(compareData.data, compareData.series);
  }, [compareData]);

  const chartWidth = Math.max(900, chartData.length * 90);
  const chartHeight = 320;

  return (
    <div className={styles.graphCard}>
      <h3 className={styles.graphTitle}>{compareData.field} Comparison</h3>

      <div className={styles.graphScrollWrapper}>
        <div style={{ minWidth: `${chartWidth}px` }}>
          <LineChart
            width={chartWidth}
            height={chartHeight}
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              height={60}
              angle={-20}
              textAnchor="end"
              minTickGap={20}
              tick={{ fill: '#737373', fontSize: 12, fontFamily: 'DM Sans' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              }}
            />

            <YAxis tick={{ fill: '#737373', fontSize: 12, fontFamily: 'DM Sans' }} />

            <Tooltip
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });
              }}
            />

            <Legend />

            {compareData.series.map((s: any, index: number) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={false}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default MeterComparisonGraph;
