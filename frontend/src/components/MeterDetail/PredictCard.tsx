import React from "react";
import styles from "./PredictCard.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "SEP", actual: 22.1, forecast: null },
  { month: "OCT", actual: 25.6, forecast: null },
  { month: "NOV", actual: 27.3, forecast: 27.3 },
  { month: "DEC", actual: null, forecast: 29.5 },
  { month: "JAN", actual: null, forecast: 31.2 },
  { month: "FEB", actual: null, forecast: 30.1 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p>{payload[0].value.toFixed(3)}</p>
      </div>
    );
  }
  return null;
};

// Custom dot สำหรับจุดสุดท้ายของเส้น actual
const LastActualDot = (props: any) => {
  const { cx, cy, payload } = props;
  
  // ตรวจสอบว่าเป็นจุดสุดท้ายของเส้น actual หรือไม่
  if (payload && payload.month === "NOV") {
    return (
      <g>
        {/* จุดวงกลมสีขาวด้านใน */}
        <circle cx={cx} cy={cy} r={8} fill="#8FD14F" />
        <circle cx={cx} cy={cy} r={4} fill="white" />
      </g>
    );
  }
  return null;
};

const PredictCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>predict</div>

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
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="10 10" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#787878", fontSize: 14 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#787878", fontSize: 14 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8FD14F"
              strokeWidth={5}
              dot={false}
              activeDot={{ r: 8, fill: "#8FD14F" }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#FF6600"
              strokeWidth={5}
              dot={false}
            />
            {/* เพิ่มเส้นซ้อนสำหรับแสดง dot สุดท้าย */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="transparent"
              strokeWidth={0}
              dot={<LastActualDot />}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictCard;