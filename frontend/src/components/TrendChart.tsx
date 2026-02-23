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

  useEffect(() => {
    console.log("TrendChart received data:", data);
  }, [data]);

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

  // const getLegendLabels = () => {
  //   switch (selectedTrend) {
  //     case "SUM":
  //       return { purple: "Watt Sum", green: "Volt Avg", orange: "Current Sum" };
  //     case "Volt":
  //       return { purple: "Volt Avg", green: "Voltage L1", orange: "Voltage L2" };
  //     case "Current":
  //       return { purple: "Current Sum", green: "Current L1", orange: "Current L2" };
  //     case "VA":
  //       return { purple: "VA L1", green: "VA L2", orange: "VA L3" };
  //     case "VAR":
  //       return { purple: "VAR L1", green: "VAR L2", orange: "VAR L3" };
  //     case "PF":
  //       return { purple: "PF L1", green: "PF L2", orange: "PF L3" };
  //     case "Energy":
  //       return { purple: "Energy Import", green: "Energy Export", orange: "Watt Sum" };
  //     default:
  //       return { purple: "Watt Sum", green: "Volt Avg", orange: "Current Sum" };
  //   }
  // };


  const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const date = new Date(label);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  } ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  //const labels = getLegendLabels();


   return (
      <div
        style={{
          background: "#1f1f1f",
          padding: "12px 16px",
          borderRadius: 12,
          border: "1px solid #444",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          fontSize: 13,
        }}
      >
        <div style={{ color: "#aaa", marginBottom: 8 }}>
          {formattedDate}
        </div>

        {payload.map((entry: any, index: number) => {
          let unit = "";

          if (entry.dataKey === ("power")) unit = " kW";
          if (entry.dataKey === ("volt")) unit = " V";
          if (entry.dataKey === ("current")) unit = " A";

          return (
            <div
              key={index} style={{ display: "flex",justifyContent: "space-between"}}>
            <span>{entry.name}</span>
            <span>
              {Number(entry.value).toFixed(2)}{unit}
            </span>
          </div>
        );
  })}
      </div>
    );
  };

  const showPower = selectedTrend === "SUM";
  const showVolt = selectedTrend === "SUM" || selectedTrend === "Volt";
  const showCurrent = selectedTrend === "SUM" || selectedTrend === "Current";

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
              //interval="preserveStartEnd"
              tick={{ fontSize: fontSize, fill: "#aaa" }}
              minTickGap={50}
              tickFormatter={(value: string) => {
                // const date = new Date(value);
                // const day = date.getDate();
                // const month = date.getMonth() + 1;
                // const hour = date.getHours().toString().padStart(2, "0");
                // const minute = date.getMinutes().toString().padStart(2, "0");
                // return `${month}/${day} ${hour}:${minute}`;
      
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            
              }}
            />
              {/* <Label
                offset={-5}
                position="insideBottom"
                style={{ fontSize: fontSize - 1, fill: "#ccc" }}
              /> */}

          {/* Volt Current */}
          
            <YAxis
              yAxisId="left"
              hide={!(showVolt || showCurrent)}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: fontSize, fill: "#8FD14F" }}
            >
              <Label
                  value={
                    showVolt && showCurrent
                      ? "Volt (V) / Current (A)"
                      : showVolt
                      ? "Volt (V)"
                      : "Current (A)"
                  }
                  angle={-90}
                  position="insideLeft"
                  style={{ fill: "#8FD14F", fontSize: fontSize }}
                />
             </YAxis>
        

             {/* 🔥 Power */}
           
              <YAxis
                yAxisId="right"
                orientation="right"
                hide={!showPower}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: fontSize, fill: "#604CC3" }}
              >
                <Label
                  value="Power (kW)"
                  angle={90}
                  position="insideRight"
                  style={{ fill: "#604CC3", fontSize: fontSize }}
                />
              </YAxis>
            
            
            <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: "#999", strokeWidth: 1 }}
             />
            
            <Legend
              verticalAlign="top"
              height={36}
            />

            {showPower && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="power"
                stroke="#604CC3"
                strokeWidth={3}
                dot={false}
                name="Power (kW)"
                animationDuration={500}
              />
            )}

            {showVolt && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="volt"
                stroke="#8FD14F"
                strokeWidth={3}
                dot={false}
                name="Volt Avg (V)"
                animationDuration={500}
              />
            )}

            {showCurrent && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="current"
                stroke="#FF6600"
                strokeWidth={3}
                dot={false}
                name="Current Sum (A)"
                animationDuration={500}
              />
            )}

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
