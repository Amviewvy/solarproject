import React, { useEffect, useState } from 'react';
import styles from './PredictCard.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useParams } from 'react-router-dom';

const apiUrl: string = import.meta.env.VITE_API_URL;


type ChartRow = {
  time: string;
  actual: number | null;
  forecast: number | null;
  error?:number |null;
  avgError?: number | null;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const actual = payload.find((p: any) => p.dataKey === 'actual');
  const forecast = payload.find((p: any) => p.dataKey === 'forecast');
  const error = payload.find((p: any) => p.dataKey === 'error');
  const avgErrorValue = payload.find((p: any) => p.dataKey === 'avgError');

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
      <div className={styles.tooltipTime}>{label}</div>

      {actual?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipActual}>Actual: </span>
          <span className={styles.tooltipActual}>{Number(actual.value).toFixed(2)}</span>
        </div>
      )}

      {forecast?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipForecast}>Forecast: </span>
          <span className={styles.tooltipForecast}>{Number(forecast.value).toFixed(2)}</span>
        </div>
      )}

      {error?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipError}>Error: </span>
          <span>{Number(error.value).toFixed(2)}</span>
        </div>
      )}

      {avgErrorValue?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipError}>Avg Error: </span>
          <span>{Number(avgErrorValue.value).toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

const PredictCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ChartRow[]>([]);
  const [avgError, setAvgError] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const actualRes = await fetch(`${apiUrl}/measurements/energy-consumption?device_id=${id}`);
      const forecastRes = await fetch(`${apiUrl}/telemetry-forecast/future/${id}`);

      const actualJson = await actualRes.json();
      const forecastJson = await forecastRes.json();

      const map: Record<number, ChartRow> = {};

      // ===== actual =====
      actualJson.import.forEach((row: any) => {
        const now = new Date();
        const date = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(row.time),
          0,
          0,
          0,
        );

        const ts = date.getTime();

        map[ts] = {
          time: '',
          actual: parseFloat(row.value),
          forecast: null,
        };
      });

      // ===== forecast =====
      forecastJson.forEach((row: any) => {
        const raw = row.ts.replace('T', ' ').replace('Z', '');
        const date = new Date(raw);

        const hourDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          0,
          0,
          0,
        );

        const ts = hourDate.getTime();

        if (!map[ts]) {
          map[ts] = {
            time: '',
            actual: null,
            forecast: 0,
          };
        }

        map[ts].forecast += row.yhat;
      });

      // ===== sort =====
      const result = Object.entries(map)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([ts, value]) => {
          const date = new Date(Number(ts));

          let error: number | null = null;

          if (value.actual !== null && value.forecast !== null) {
            error = Math.abs(value.actual - value.forecast);
          }

          return {
            ...value,
            error,
            time: date.toLocaleString('en-GB', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              hour12: false,
            }),
          };
        });

        const validErrors = result
        .map((d) => d.error)
        .filter((e): e is number => e !== null);

        const avgError =
          validErrors.length > 0
            ? validErrors.reduce((sum, e) => sum + e, 0) / validErrors.length
            : 0;

          setAvgError(avgError);

        console.log("Avg Error =", avgError);
        

      const resultWithAvg = result.map((d) => ({
        ...d,
        avgError: avgError, // ✅ ใส่เข้าไปทุก row
      }));

      setData(resultWithAvg);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>Energy Prediction</div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            <span>Actual</span>
          </div>

          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotOrange}`}></span>
            <span>Forecast</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 10 }}>

            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8fd14f" stopOpacity={0.6}/>
                <stop offset="100%" stopColor="#8fd14f" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff6600" stopOpacity={0.5}/>
                <stop offset="100%" stopColor="#ff6600" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#444" strokeDasharray="4 4" vertical={false} />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787878', fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787878', fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="actual"
              stroke="#8fd14f"
              strokeWidth={2}
              fill="url(#actualGradient)"
              dot={false}
              connectNulls
            />

            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#ff6600"
              strokeWidth={2}
              fill="url(#forecastGradient)"
              dot={false}
              connectNulls
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictCard;