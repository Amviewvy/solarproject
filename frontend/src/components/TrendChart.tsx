import React, { useState, useEffect } from "react";
import styles from "../styles/TrendChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // CartesianGrid,
  Label,
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
  const [fontSize, setFontSize] = useState(12);

  // ✅ ปรับขนาดฟอนต์ตามความกว้างหน้าจอ
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setFontSize(9);
      else if (width < 1000) setFontSize(11);
      else setFontSize(13);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLegendLabels = () => {
    switch (selectedTrend) {
      case "SUM":
        return { purple: "Watt Sum", green: "Volt Avg", orange: "Current Sum" };
      case "Volt":
        return { purple: "Volt Avg", green: "Voltage L1", orange: "Voltage L2" };
      case "Current":
        return { purple: "Current Sum", green: "Current L1", orange: "Current L2" };
      case "VA":
        return { purple: "VA L1", green: "VA L2", orange: "VA L3" };
      case "VAR":
        return { purple: "VAR L1", green: "VAR L2", orange: "VAR L3" };
      case "PF":
        return { purple: "PF L1", green: "PF L2", orange: "PF L3" };
      case "Energy":
        return { purple: "Energy Import", green: "Energy Export", orange: "Watt Sum" };
      default:
        return { purple: "Watt Sum", green: "Volt Avg", orange: "Current Sum" };
    }
  };

  const labels = getLegendLabels();

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
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" opacity={0.3} /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fontSize: fontSize, fill: "#aaa" }}
              minTickGap={50}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const hour = date.getHours().toString().padStart(2, "0");
                const minute = date.getMinutes().toString().padStart(2, "0");
                return `${month}/${day} ${hour}:${minute}`;
              }}
            >
              <Label
                offset={-5}
                position="insideBottom"
                style={{ fontSize: fontSize - 1, fill: "#ccc" }}
              />
            </XAxis>
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDataOverflow={false}
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: fontSize, fill: "#aaa" }}
              tickFormatter={(v) => v.toFixed(2)}
            >
              <Label
                angle={-90}
                position="insideLeft"
                offset={10}
                style={{ fontSize: fontSize - 1, fill: "#ccc" }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{
                background: "#1f1f1f",
                border: "1px solid #555",
                borderRadius: 10,
                color: "#fff",
              }}
              formatter={(value: number, name: string) => [
                value.toFixed(2),
                labels[name as keyof typeof labels],
              ]}
              labelStyle={{ color: "#ccc", fontSize: fontSize }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                color: "#eee",
                fontSize: fontSize - 1,
              }}
            />

            <Line
              type="monotone"
              dataKey="purple"
              stroke="#604CC3"
              strokeWidth={3}
              dot={false}
              name={labels.purple}
            />
            <Line
              type="monotone"
              dataKey="green"
              stroke="#8FD14F"
              strokeWidth={3}
              dot={false}
              name={labels.green}
            />
            <Line
              type="monotone"
              dataKey="orange"
              stroke="#FF6600"
              strokeWidth={3}
              dot={false}
              name={labels.orange}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
