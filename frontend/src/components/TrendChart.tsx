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

const TrendChart: React.FC<TrendChartProps> = ({ selectedTrend, data, value, up }) => {
  const dataTrendChart = data;
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

  /* ===============================
     Tooltip
  ================================ */

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
              <span style={{ color: color, marginRight: 10 }}>{`${entry.name}`}</span>
              <span style={{ color: color }}>
                {Number(entry.value).toFixed(2)}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  /* ===============================
     กำหนดความกว้างให้ overflow แน่นอน
  ================================ */

  const chartWidth = Math.max(data.length * 40, 1200);
  return (
    <div className={styles.Container}>
      <div className={styles.infoBox}>
        <h2 className={styles.value}>
          {showVolt && ((value.Volts1 + value.Volts2 + value.Volts3) / 3).toFixed(2)}
          {showCurrent && `${(value.Current1 + value.Current2 + value.Current3).toFixed(2)} A`}
          {showPower && `${((value.W1 + value.W2 + value.W3) / 1000).toFixed(2)} kW`}
        </h2>
        <p className={styles.label}>
          {selectedTrend} <span className={styles.up}>{up}</span>
        </p>
      </div>

      <div className={styles.chartContainer} style={{ height: 500 }}>
        <div className={styles.chartRow}>
          {/*<div style={{ display: "flex", minWidth: 0 }}>*/}

          {/* ===== FIXED LEFT AXIS ===== */}
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

                {/*  <YAxis
                  yAxisId="current"
                  orientation="right"
                  domain={currentDomain}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  yAxisId="power"
                  orientation="right"
                  domain={powerDomain}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />*/}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ===== SCROLLABLE AREA ===== */}
          <div
            style={{
              overflowX: 'auto',
              flex: 1,
              //maxWidth: "100%",
              scrollbarWidth: 'thin',
              //border: "1px solid red",
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

                  {/* <YAxis hide yAxisId="volt" domain={leftDomain} />
                  <YAxis hide yAxisId="current" domain={currentDomain} />
                  <YAxis hide yAxisId="power" domain={powerDomain} /> */}

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
                        key={`cuurent-${p}`}
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
          {/*</div>*/}
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
                Current{p}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
