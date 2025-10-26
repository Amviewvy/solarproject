"use client";
import React, { useEffect, useState } from "react";
import styles from "./MeterDetail_main_2.module.css";
import LogTable, { type LogRow } from "../Log_compare/LogTable";
import TrendCard from "../TrendCard";
import PredictCard from "./PredictCard";

// TrendData ////////////////////////////////////////////////
// interface TrendData {
//   month: string;
//   green: number;
//   purple: number;
//   orange: number;
// }

// interface TrendAPIResponse {
//   data: TrendData[];
//   value: number;
//   up: string;
//   dotStatus: string;
// }
// TrendData ////////////////////////////////////////////////

const MeterDetail_main_2: React.FC = () => {
  const [data, setData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/measurements");
        if (!res.ok) throw new Error("Failed to fetch meter data");
        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 ตัวอย่างข้อมูลจำลอง
  const TrendData = [
    { month: "SEP", green: 24, purple: 28, orange: 20 },
    { month: "OCT", green: 26, purple: 29, orange: 21 },
    { month: "NOV", green: 27.3, purple: 30, orange: 22 },
    { month: "DEC", green: 26, purple: 29.5, orange: 19 },
    { month: "JAN", green: 27, purple: 30.5, orange: 22 },
    { month: "FEB", green: 28, purple: 32, orange: 23 },
  ];

  // 🔹 ค่าปัจจุบัน (สามารถมาจาก API ได้)
  const value = 27.304;
  const up = "+2.45%";

  // TrendData ////////////////////////////////////////////////
  //   const [data, setData] = useState<TrendData[]>([]);
  //   const [value, setValue] = useState<number | string>("--");
  //   const [up, setUp] = useState<string>("-");
  //   const [dotStatus, setDotStatus] = useState<string>("Loading...");
  //   const [loading, setLoading] = useState<boolean>(true);

  //   // 🔹 ดึงข้อมูลจาก API backend (Node.js / Flask / ฯลฯ)
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await fetch("http://localhost:3000/api/dashboard/trend");
  //         // ✅ เปลี่ยน URL ให้ตรงกับ backend ของคุณ
  //         if (!res.ok) throw new Error("API request failed");
  //         const result: TrendAPIResponse = await res.json();

  //         setData(result.data);
  //         setValue(result.value);
  //         setUp(result.up);
  //         setDotStatus(result.dotStatus);
  //       } catch (error) {
  //         console.error("❌ Error fetching data:", error);
  //         setDotStatus("Error loading data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   if (loading) {
  //     return <div className={styles.loading}>Loading...</div>;
  //   }
  // TrendData ////////////////////////////////////////////////

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <TrendCard
          data={TrendData}
          value={value}
          up={up}
        />
      </div>
      <div className={styles.div2}>
        <PredictCard />
      </div>
      <div className={styles.div3}>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <LogTable data={data} />
        )}
      </div>
    </div>
  );
};

export default MeterDetail_main_2;
