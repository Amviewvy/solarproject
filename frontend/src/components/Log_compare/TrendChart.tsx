import React from "react";
import styles from "./TrendChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  selectedMeter: string;
}

const data = [
  { month: "SEP", volt: 24, current: 28, power: 20 },
  { month: "OCT", volt: 26, current: 29, power: 21 },
  { month: "NOV", volt: 27.3, current: 30, power: 22 },
  { month: "DEC", volt: 26, current: 29.5, power: 19 },
  { month: "JAN", volt: 27, current: 30.5, power: 22 },
  { month: "FEB", volt: 28, current: 32, power: 23 },
];

const isMobile = typeof window !== "undefined" && window.innerWidth < 1025;
const height = isMobile ? 200 : 350;

const TrendChart: React.FC<TrendChartProps> = ({ selectedMeter }) => {
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
            <span>{selectedMeter}_Volt</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.green}`}></span>
            <span>{selectedMeter}_Current</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.orange}`}></span>
            <span>{selectedMeter}_Power</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              formatter={(value, name) => {
                const formattedName =
                  name === "volt"
                    ? "Volt"
                    : name === "current"
                      ? "Current"
                      : "Power";
                return [`${value}`, formattedName];
              }}
              labelFormatter={(label) => `Month: ${label}`}
            />
            {/* เส้นกราฟ 3 สีตามในรูป */}
            <Line
              type="monotone"
              dataKey="volt"
              stroke="#604CC3"
              strokeWidth={5}
              dot={false}
            />
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
