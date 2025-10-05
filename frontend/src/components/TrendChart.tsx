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
}

const data = [
  { month: "SEP", green: 24, purple: 28, orange: 20 },
  { month: "OCT", green: 26, purple: 29, orange: 21 },
  { month: "NOV", green: 27.3, purple: 30, orange: 22 },
  { month: "DEC", green: 26, purple: 29.5, orange: 19 },
  { month: "JAN", green: 27, purple: 30.5, orange: 22 },
  { month: "FEB", green: 28, purple: 32, orange: 23 },
];

const TrendChart: React.FC<TrendChartProps> = ({ selectedTrend }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.infoBoxOverlay}>
        <h2 className={styles.value}>27.304</h2>
        <p className={styles.label}>
           {selectedTrend} <span className={styles.up}>+2.45%</span>
        </p>
        <p className={styles.status}>
          <span className={styles.dot}></span> On track
        </p>
      </div>
      <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}
        margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
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
