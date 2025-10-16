"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./MeterComparison.module.css";

interface MeterComparisonGraphProps {
  field: string;
  selectedMeters: string[];
}

const MeterComparisonGraph: React.FC<MeterComparisonGraphProps> = ({
  field,
  selectedMeters,
}) => {
  // สร้าง mock data จำลองต่อมิเตอร์
  const data = Array.from({ length: 12 }, (_, i) => {
    const point: any = { month: `M${i + 1}` };
    selectedMeters.forEach((meter, idx) => {
      point[meter] = Math.random() * 100 + 50 * idx;
    });
    return point;
  });

  const colors = [
    "#4B0082", // Indigo
    "#8FD14F", // Lime Green
    "#FF6600", // Orange
    "#00BCD4", // Cyan
    "#9C27B0", // Purple
    "#F44336", // Red
    "#3F51B5", // Blue
    "#009688", // Teal
    "#FFC107", // Amber
    "#795548", // Brown
    "#607D8B", // Blue Gray
    "#E91E63", // Pink
  ];

  return (
    <div className={styles.graphCard}>
      <h3 className={styles.graphTitle}>{field} Comparison</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMeters.map((meter, index) => (
            <Line
              key={meter}
              type="monotone"
              dataKey={meter}
              stroke={colors[index % colors.length]}
              strokeWidth={5}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MeterComparisonGraph;
