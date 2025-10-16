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
  dotStatus: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  selectedTrend,
  data,
  value,
  up,
  dotStatus,
}) => {
  const dotColor =
    dotStatus === "On track"
      ? "#05CD99"
      : dotStatus === "Warning"
        ? "#FF6600"
        : "#FF0000";

  return (
    <div className={styles.Container}>
      <div className={styles.infoBox}>
        <h2 className={styles.value}>{value}</h2>
        <p className={styles.label}>
          {selectedTrend} <span className={styles.up}>{up}</span>
        </p>
        <p className={styles.status}>
          <span
            className={styles.dot}
            style={{ backgroundColor: dotColor }}
          ></span>{" "}
          {dotStatus}
        </p>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
          >
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="purple"
              stroke="#604CC3"
              strokeWidth={5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="green"
              stroke="#8FD14F"
              strokeWidth={5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="orange"
              stroke="#FF6600"
              strokeWidth={5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
