import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard_main_2.module.css";
import DateRangePicker from "./Calendar_DateRangePicker";
import TrendCard from "./TrendCard";

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

// const Dashboard_main_2: React.FC = () => {
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
const Dashboard_main_2: React.FC = () => {
  // 🔹 ตัวอย่างข้อมูลจำลอง
  const data = [
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
  const dotStatus = "On track"; // หรือ "Warning", "Offline"

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker />
      </div>
      <div className={styles.div2}>
        <TrendCard data={data} value={value} up={up} dotStatus={dotStatus} />
      </div>
    </div>
  );
};

export default Dashboard_main_2;
