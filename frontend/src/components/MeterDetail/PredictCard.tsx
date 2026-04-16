import React, { useEffect, useState } from 'react';
import styles from './PredictCard.module.css';
import {
  LineChart,
  Line,
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
    <div className={styles.tooltip}>
      <div className={styles.tooltipTime}>{label}</div>

      {actual?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipActual}>Actual: </span>
          <span>{Number(actual.value).toFixed(2)}</span>
        </div>
      )}

      {forecast?.value != null && (
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipForecast}>Forecast: </span>
          <span>{Number(forecast.value).toFixed(2)}</span>
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

      

      // ===== actual (hourly energy) =====
      const actualMap: Record<string, number> = {};

      actualJson.import.forEach((row: any) => {
        actualMap[row.time] = parseFloat(row.value);
      });



      // ===== forecast =====
      const forecastMap: Record<string, number> = {};

      forecastJson.forEach((row: any) => {
        const date = new Date(row.ts);
        const hour = date.getHours().toString().padStart(2, '0');

        if (!forecastMap[hour]) {
          forecastMap[hour] = 0;
        }

        forecastMap[hour] += row.yhat;
      });

      const map: Record<number, ChartRow> = {};

      // actual
     actualJson.import.forEach((row: any) => {
      const hour = parseInt(row.time);

      const ts = new Date().setHours(hour, 0, 0, 0);

       if (!map[ts]) {
       map[ts] = {
       time: '',
       actual: null,
       forecast: null,
       error: null,
      };
    }
      map[ts].actual = parseFloat(row.value);
    });

      // forecast

      // const lastActualTs = Math.max(
      //   ...Object.keys(map)
      //     .filter((k) => map[Number(k)].actual !== null)
      //     .map(Number),
      // );
    forecastJson.forEach((row: any) => {
      const date = new Date(row.ts);
      const hour = date.getHours();

      const ts = new Date().setHours(hour, 0, 0, 0); 

      if (!map[ts]) {
        map[ts] = {
        time: '',
        actual: null,
        forecast: 0,
        error: null,
      };
    }
    map[ts].forecast = (map[ts].forecast || 0) + row.yhat;
    });
    
      // sort
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
          <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="10 10" vertical={false} />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787878', fontSize: 12 }}
            />

            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#787878', fontSize: 12 }} />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8FD14F"
              strokeWidth={4}
              dot={false}
              connectNulls
            />

            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#FF6600"
              strokeWidth={4}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="error"
              stroke="transparent"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="avgError"
              stroke="transparent"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictCard;
