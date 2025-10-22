import React from "react";
import styles from "../styles/TrendChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  selectedTrend: string;
  data: any[];
  value: number | string;
  up: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  selectedTrend,
  data,
  value,
  up,
}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.infoBox}>
        <h2 className={styles.value}>{value}</h2>
        <p className={styles.label}>
          {selectedTrend} <span className={styles.up}>{up}</span>
        </p>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
          >
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="purple" stroke="#604CC3" strokeWidth={5} dot={false} />
            <Line type="monotone" dataKey="green" stroke="#8FD14F" strokeWidth={5} dot={false} />
            <Line type="monotone" dataKey="orange" stroke="#FF6600" strokeWidth={5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
