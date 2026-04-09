import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/TrendChart.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { DataTrendChart } from '../types/common';

interface TrendChartProps {
  selectedTrend: string;
  data: DataTrendChart[];
  value: DataTrendChart;
  up: string;
}

type SummaryMetric = {
  label: string;
  unit: string;
  sum: number;
  avg: number;
  latest: number;
  previous: number | null;
  diff: number | null;
  percentChange: number | null;
};

const TrendChart: React.FC<TrendChartProps> = ({ selectedTrend, data, value }) => {
  const dataTrendChart = [...data].reverse();
  const [fontSize, setFontSize] = useState(12);
  const phases = [1, 2, 3];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setFontSize(9);
      else if (width < 1000) setFontSize(11);
      else setFontSize(13);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showPower = selectedTrend === 'Power';
  const showVolt = selectedTrend === 'Volts';
  const showCurrent = selectedTrend === 'Current';
  const showVA = selectedTrend === 'VA';
  const showVAR = selectedTrend === 'VAR';

  const leftDomain = useMemo(() => {
    const values = dataTrendChart.flatMap((d) => [
      Number(d.Volts1 || 0),
      Number(d.Volts2 || 0),
      Number(d.Volts3 || 0),
    ]);

    const min = Math.min(...values);
    const max = Math.max(...values);
    return [Math.floor(min), Math.ceil(max)];
  }, [dataTrendChart]);

  const powerDomain = useMemo(() => {
    const values = dataTrendChart.flatMap((d) => [
      Number(d.W1 || 0),
      Number(d.W2 || 0),
      Number(d.W3 || 0),
    ]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = 20;

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [dataTrendChart]);

  const currentDomain = useMemo(() => {
    const values = dataTrendChart.flatMap((d) => [
      Number(d.Current1 || 0),
      Number(d.Current2 || 0),
      Number(d.Current3 || 0),
    ]);

    const min = Math.min(...values);
    const max = Math.max(...values);

    return [Math.floor(min * 0.9), Math.ceil(max * 1.1)];
  }, [dataTrendChart]);

  const vaDomain = useMemo(() => {
    const values = dataTrendChart.flatMap((d) => [
      Number(d.VA1 || 0),
      Number(d.VA2 || 0),
      Number(d.VA3 || 0),
    ]);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = 20;

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [dataTrendChart]);

  const varDomain = useMemo(() => {
    const values = dataTrendChart.flatMap((d) => [
      Number(d.VAR1 || 0),
      Number(d.VAR2 || 0),
      Number(d.VAR3 || 0),
    ]);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = 20;

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [dataTrendChart]);

  const summary = useMemo<SummaryMetric>(() => {
    const getMetricValues = (row: DataTrendChart) => {
      if (selectedTrend === 'Volts') {
        return {
          values: [Number(row.Volts1 || 0), Number(row.Volts2 || 0), Number(row.Volts3 || 0)],
          unit: 'V',
          label: 'Voltage',
          convert: 1,
        };
      }

      if (selectedTrend === 'Current') {
        return {
          values: [Number(row.Current1 || 0), Number(row.Current2 || 0), Number(row.Current3 || 0)],
          unit: 'A',
          label: 'Current',
          convert: 1,
        };
      }

      if (selectedTrend === 'Power') {
        return {
          values: [Number(row.W1 || 0), Number(row.W2 || 0), Number(row.W3 || 0)],
          unit: 'kW',
          label: 'Power',
          convert: 1 / 1000,
        };
      }

      if (selectedTrend === 'VA') {
        return {
          values: [Number(row.VA1 || 0), Number(row.VA2 || 0), Number(row.VA3 || 0)],
          unit: 'VA',
          label: 'Apparent Power',
          convert: 1,
        };
      }

      return {
        values: [Number(row.VAR1 || 0), Number(row.VAR2 || 0), Number(row.VAR3 || 0)],
        unit: 'VAR',
        label: 'Reactive Power',
        convert: 1,
      };
    };

    const currentMetric = getMetricValues(value);
    const sum = currentMetric.values.reduce((acc, num) => acc + num, 0) * currentMetric.convert;
    const avg =
      (currentMetric.values.reduce((acc, num) => acc + num, 0) / 3) * currentMetric.convert;

    const latestRow = dataTrendChart[dataTrendChart.length - 1];
    const previousRow = dataTrendChart[dataTrendChart.length - 2];

    const latestMetric = latestRow ? getMetricValues(latestRow) : currentMetric;
    const previousMetric = previousRow ? getMetricValues(previousRow) : null;

    const latest = latestMetric.values.reduce((acc, num) => acc + num, 0) * latestMetric.convert;

    const previous = previousMetric
      ? previousMetric.values.reduce((acc, num) => acc + num, 0) * previousMetric.convert
      : null;

    const diff = previous !== null ? latest - previous : null;
    const percentChange = previous !== null && previous !== 0 ? (diff! / previous) * 100 : null;

    return {
      label: currentMetric.label,
      unit: currentMetric.unit,
      sum,
      avg,
      latest,
      previous,
      diff,
      percentChange,
    };
  }, [selectedTrend, value, dataTrendChart]);

  const trendText = useMemo(() => {
    if (summary.diff === null || summary.percentChange === null) return 'No previous data';

    const isUp = summary.diff > 0;
    const isDown = summary.diff < 0;
    const arrow = isUp ? '▲' : isDown ? '▼' : '•';

    return `${arrow} ${Math.abs(summary.percentChange).toFixed(2)}% (${Math.abs(summary.diff).toFixed(2)} ${summary.unit})`;
  }, [summary]);

  const trendClassName = useMemo(() => {
    if (summary.diff === null) return styles.neutral;
    if (summary.diff > 0) return styles.up;
    if (summary.diff < 0) return styles.down;
    return styles.neutral;
  }, [summary]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const date = label;
    return (
      <div
        style={{
          background: '#ffffff',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #444',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          fontSize: 13,
        }}
      >
        <div style={{ color: '#000000', marginBottom: 8 }}>{date}</div>

        {payload.map((entry: any, index: number) => {
          const phaseColors = ['#604cc3', '#8fd14f', '#ff6600'];

          const phase = Number(entry.dataKey.slice(-1)) - 1;
          const color = phaseColors[phase] ?? '#999';

          let unit = '';
          if (entry.dataKey.startsWith('W')) unit = ' W';
          else if (entry.dataKey.startsWith('Volts')) unit = ' V';
          else if (entry.dataKey.startsWith('Current')) unit = ' A';
          else if (entry.dataKey.startsWith('VA')) unit = ' VA';
          else if (entry.dataKey.startsWith('VAR')) unit = ' VAR';

          return (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color, marginRight: 10 }}>{entry.name}</span>
              <span style={{ color }}>
                {Number(entry.value).toFixed(2)}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const chartWidth = Math.max(data.length * 40, 1200);

  return (
    <div className={styles.Container}>
      <div className={styles.infoBox}>
        <div className={styles.metricCard}>
          <p className={styles.label}>Sum</p>
          <h2 className={styles.value}>
            {summary.sum.toFixed(2)} <span className={styles.unit}>{summary.unit}</span>
          </h2>
        </div>

        <div className={styles.metricCard}>
          <p className={styles.label}>Avg</p>
          <h2 className={styles.value}>
            {summary.avg.toFixed(2)} <span className={styles.unit}>{summary.unit}</span>
          </h2>
        </div>

        <div className={styles.trendCard}>
          <div className={styles.metricLabel}>Latest vs Previous</div>
          <p className={styles.label}>{summary.label}</p>
          <span className={trendClassName}>{trendText}</span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartRow}>
          <div style={{ width: 90, height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                {showVolt && (
                  <YAxis
                    yAxisId="volt"
                    orientation="left"
                    domain={leftDomain}
                    tick={{ fontSize, fill: '#aaa' }}
                    tickCount={5}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
                {showCurrent && (
                  <YAxis
                    yAxisId="current"
                    orientation="left"
                    domain={currentDomain}
                    tick={{ fontSize, fill: '#aaa' }}
                    tickCount={5}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
                {showPower && (
                  <YAxis
                    yAxisId="power"
                    orientation="left"
                    domain={powerDomain}
                    tick={{ fontSize, fill: '#aaa' }}
                    tickCount={5}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
                {showVA && (
                  <YAxis
                    yAxisId="VA"
                    orientation="left"
                    domain={vaDomain}
                    tick={{ fontSize, fill: '#aaa' }}
                    tickCount={5}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
                {showVAR && (
                  <YAxis
                    yAxisId="VAR"
                    orientation="left"
                    domain={varDomain}
                    tick={{ fontSize, fill: '#aaa' }}
                    tickCount={5}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              overflowX: 'auto',
              flex: 1,
              scrollbarWidth: 'thin',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: `${chartWidth}px`,
                height: '100%',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataTrendChart}
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid stroke="#444" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="ts"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize, fill: '#aaa' }}
                    interval="preserveStartEnd"
                  />
                  <Tooltip content={<CustomTooltip />} />

                  {showPower &&
                    phases.map((p) => (
                      <Line
                        key={`power-${p}`}
                        yAxisId="power"
                        type="monotone"
                        dataKey={`W${p}`}
                        stroke={p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600'}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}

                  {showVolt &&
                    phases.map((p) => (
                      <Line
                        key={`volt-${p}`}
                        yAxisId="volt"
                        type="monotone"
                        dataKey={`Volts${p}`}
                        stroke={p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600'}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}

                  {showCurrent &&
                    phases.map((p) => (
                      <Line
                        key={`current-${p}`}
                        yAxisId="current"
                        type="monotone"
                        dataKey={`Current${p}`}
                        stroke={p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600'}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}

                  {showVA &&
                    phases.map((p) => (
                      <Line
                        key={`va-${p}`}
                        yAxisId="VA"
                        type="monotone"
                        dataKey={`VA${p}`}
                        stroke={p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600'}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}

                  {showVAR &&
                    phases.map((p) => (
                      <Line
                        key={`var-${p}`}
                        yAxisId="VAR"
                        type="monotone"
                        dataKey={`VAR${p}`}
                        stroke={p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600'}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={styles.legendBottom}>
          {showPower &&
            phases.map((p) => (
              <div key={`legend-power-${p}`} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor: p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600',
                  }}
                />
                W{p}
              </div>
            ))}

          {showVolt &&
            phases.map((p) => (
              <div key={`legend-volt-${p}`} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor: p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600',
                  }}
                />
                Volts{p}
              </div>
            ))}

          {showCurrent &&
            phases.map((p) => (
              <div key={`legend-current-${p}`} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor: p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600',
                  }}
                />
                Current{p}
              </div>
            ))}

          {showVA &&
            phases.map((p) => (
              <div key={`legend-va-${p}`} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor: p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600',
                  }}
                />
                VA{p}
              </div>
            ))}

          {showVAR &&
            phases.map((p) => (
              <div key={`legend-var-${p}`} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor: p === 1 ? '#604cc3' : p === 2 ? '#8fd14f' : '#ff6600',
                  }}
                />
                VAR{p}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
