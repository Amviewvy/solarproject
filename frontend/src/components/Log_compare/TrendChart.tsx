import React from "react";
import styles from "./TrendChart.module.css";
import { useEffect, useState } from "react";



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
  startDate?: Date | null;
  endDate?: Date | null;
  meterId?: number;
  baseUrl?: string;
}

// const data = [
//   { month: "SEP", volt: 24, current: 28, power: 20 },
//   { month: "OCT", volt: 26, current: 29, power: 21 },
//   { month: "NOV", volt: 27.3, current: 30, power: 22 },
//   { month: "DEC", volt: 26, current: 29.5, power: 19 },
//   { month: "JAN", volt: 27, current: 30.5, power: 22 },
//   { month: "FEB", volt: 28, current: 32, power: 23 },
// ];

const isMobile = typeof window !== "undefined" && window.innerWidth < 1025;
const height = isMobile ? 200 : 350;


const TrendChart: React.FC<TrendChartProps> = ({ 
  selectedMeter, 
  startDate, 
  endDate, 
  meterId, 
  baseUrl }) => {

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
    if (!startDate || !endDate || !meterId || !baseUrl) return;

    let start = new Date(startDate);
    let end = new Date(endDate);

    // กันเลือกสลับวัน
    if (start > end) {
      [start, end] = [end, start];
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const formatDate = (date: Date) =>{
      return  date.toISOString().split("T")[0]; }


    fetch(
      `${baseUrl}/measurements/?meter_id=${meterId}&start=${formatDate(start)}&end=${formatDate(end)}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((json) => {
        const formatted = (json.data || []).map((item: any) => ({
          time: new Date(item.measurement_time).toLocaleDateString(),
          volt: Number(item.volts_avg),
          current: Number(item.current_sum),
          power: Number(item.watt_sum),
        }));

        setChartData(formatted);
      })
      .catch((err) => console.error("Trend fetch error:", err));
  }, [startDate, endDate, meterId, baseUrl]);

  

  
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
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
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

