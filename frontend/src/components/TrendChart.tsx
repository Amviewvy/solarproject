import React, { useState, useEffect, useMemo } from "react";
import styles from "../styles/TrendChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
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

  /* ===============================
     Responsive Font
  ================================ */
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

  const showPower = selectedTrend === "SUM";
  const showVolt = selectedTrend === "SUM" || selectedTrend === "Volt";
  const showCurrent =
    selectedTrend === "SUM" || selectedTrend === "Current";

  /* ===============================
     Sync Domain (Scale ตรงกัน 100%)
  ================================ */

  // const leftDomain = useMemo(() => {
  //   const maxValue = Math.max(
  //     ...data.map((d) =>
  //       Math.max(Number(d.volt || 0), Number(d.current || 0))
  //     ),
  //     10
  //   );
  //   //return [0, maxValue * 1.1];

  //   const roundedMax = Math.ceil(maxValue / 50) * 50; // ปัดขึ้นทีละ 50
  // return [0, roundedMax];
  // }, [data]);

  // const rightDomain = useMemo(() => {
  //   const maxValue = Math.max(
  //     ...data.map((d) => Number(d.power || 0)),
  //     10
  //   );
  //   //return [0, maxValue * 1.1];

  //   const roundedMax = Math.ceil(maxValue / 5) * 5; // ปัดขึ้นทีละ 50
  //   return [0, roundedMax];
  // }, [data]);

//   const voltDomain = useMemo(() => {
//   const max = Math.max(...data.map(d => Number(d.volt || 0)), 220);
//   return [0, Math.ceil(max / 20) * 20];
// }, [data]);

// const currentDomain = useMemo(() => {
//   const max = Math.max(...data.map(d => Number(d.current || 0)), 50);
//   return [0, Math.ceil(max / 10) * 10];
// }, [data]);

// const powerDomain = useMemo(() => {
//   const max = Math.max(...data.map(d => Number(d.power || 0)), 1);
//   return [0, max * 1.5];
// }, [data]);

const leftDomain = useMemo(() => {
  const max = Math.max(
    ...data.map((d) =>
      Math.max(Number(d.volt || 0), Number(d.current || 0))
    ),
    100
  );

  return [0, Math.ceil(max / 20) * 20];
}, [data]);

const powerDomain = useMemo(() => {
  const max = Math.max(...data.map((d) => Number(d.power || 0)), 1);
  return [0, Math.ceil(max * 1.5)];
}, [data]);

  /* ===============================
     Tooltip
  ================================ */

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const date = new Date(label);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    } ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

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
          if (entry.dataKey === "power") unit = " kW";
          if (entry.dataKey === "volt") unit = " V";
          if (entry.dataKey === "current") unit = " A";

          return (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{entry.name}</span>
              <span>
                {Number(entry.value).toFixed(2)}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  /* ===============================
     กำหนดความกว้างให้ overflow แน่นอน
  ================================ */

 const chartWidth = Math.max(data.length * 40, 1200);
 //const chartWidth = data.length * 80;
 //const chartWidth = 2000;

 console.log(data)
  return (
    <div className={styles.Container}>
      <div className={styles.infoBox}>
        <h2 className={styles.value}>{value}</h2>
        <p className={styles.label}>
          {selectedTrend} <span className={styles.up}>{up}</span>
        </p>
      </div>

      <div className={styles.chartContainer} style={{height: 420}}>
        <div className={styles.chartRow}>
        {/*<div style={{ display: "flex", minWidth: 0 }}>*/}
          
          {/* ===== FIXED LEFT AXIS ===== */}
          <div style={{ width: 80, height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  domain={leftDomain}
                  tick={{ fontSize, fill: "#aaa" }}
                  tickCount={6}
                  axisLine={false}
                  tickLine={false}
                />
              {/*  <YAxis
                  yAxisId="current"
                  orientation="right"
                  domain={currentDomain}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  yAxisId="power"
                  orientation="right"
                  domain={powerDomain}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />*/}
                

              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ===== SCROLLABLE AREA ===== */}
          <div
            style={{
              overflowX: "auto",
              flex: 1,
              //maxWidth: "100%",
              scrollbarWidth: "thin",
              //border: "1px solid red",
              minWidth: 0,
              
            
            }}
          >
            <div
              style={{
                width: `${chartWidth}px`,
                height: "100%",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data} 
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    stroke="#444"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize, fill: "#aaa" }}
                    interval="preserveStartEnd"
                  />

                  {/* <YAxis hide yAxisId="volt" domain={voltDomain} />
                  <YAxis hide yAxisId="current" domain={currentDomain} />
                  <YAxis hide yAxisId="power" domain={powerDomain} />
                    */}

                  <YAxis hide yAxisId="left" domain={leftDomain} />
                   <YAxis hide yAxisId="right" domain={powerDomain} />

                    
                  
                  <Tooltip content={<CustomTooltip />} />
                  

                  {showPower && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="power"
                      stroke="#604CC3"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}

                  {showVolt && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="volt"
                      stroke="#8FD14F"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}

                  {showCurrent && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="current"
                      stroke="#FF6600"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        {/*</div>*/}

        <div style={{ width: 60, height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={powerDomain}
                  tick={{ fontSize, fill: "#aaa" }}
                  tickCount={6}
                  axisLine={false}
                  tickLine={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


        </div>
        <div className={styles.legendBottom}>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.power}`} />
            Power
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.volt}`} />
            Volt
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.current}`} />
            Current
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;