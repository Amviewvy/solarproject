import React, {useMemo} from "react";
import styles from "../../styles/Log_main_1.module.css";
import DateRangePicker from "../Calendar_DateRangePicker";
import TrendCard from "./TrendCard";
import LogTable, { type LogRow } from "./LogTable";

const generateMockData = (rows: number): LogRow[] => {
  return Array.from({ length: rows }, (_, i) => ({
    building: `B${i + 1}`,
    block: `BL${i + 1}`,
    DateTime: new Date().toISOString(),
    Volt_1: +(220 + Math.random() * 10).toFixed(2),
    Volt_2: +(220 + Math.random() * 10).toFixed(2),
    Volt_3: +(220 + Math.random() * 10).toFixed(2),
    Current_1: +(5 + Math.random() * 5).toFixed(2),
    Current_2: +(5 + Math.random() * 5).toFixed(2),
    Current_3: +(5 + Math.random() * 5).toFixed(2),
    Power_1: +(1000 + Math.random() * 500).toFixed(2),
    Power_2: +(1000 + Math.random() * 500).toFixed(2),
    Power_3: +(1000 + Math.random() * 500).toFixed(2),
    VA_1: +(1100 + Math.random() * 500).toFixed(2),
    VA_2: +(1100 + Math.random() * 500).toFixed(2),
    VA_3: +(1100 + Math.random() * 500).toFixed(2),
    VAR_1: +(300 + Math.random() * 200).toFixed(2),
    VAR_2: +(300 + Math.random() * 200).toFixed(2),
    VAR_3: +(300 + Math.random() * 200).toFixed(2),
    PF_1: +(0.8 + Math.random() * 0.2).toFixed(2),
    PF_2: +(0.8 + Math.random() * 0.2).toFixed(2),
    PF_3: +(0.8 + Math.random() * 0.2).toFixed(2),
    Frequency: +(49 + Math.random() * 2).toFixed(2),
    Energy_Im: +(5000 + Math.random() * 500).toFixed(2),
    Energy_Ex: +(3000 + Math.random() * 300).toFixed(2),
    PowerSum: +(3000 + Math.random() * 500).toFixed(2),
    PowerAve: +(1000 + Math.random() * 200).toFixed(2),
    VA_SUM: +(3300 + Math.random() * 500).toFixed(2),
    VA_AVE: +(1100 + Math.random() * 200).toFixed(2),
  }));
};

const Log_main_1: React.FC = () => {
  // ใช้ useMemo ป้องกัน mock data ถูกสร้างซ้ำทุก render
  const data = useMemo(() => generateMockData(100), []);

  // const [data, setData] = useState<LogRow[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // // 🔹 ดึงข้อมูลจาก API
  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const response = await fetch("http://localhost:3000/api/logs");
  //       // 👆 เปลี่ยน URL ให้ตรงกับ backend ของคุณ

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const result = await response.json();

  //       // ตรวจว่าข้อมูลเป็น array ก่อน set
  //       if (Array.isArray(result)) {
  //         setData(result);
  //       } else {
  //         console.warn("Unexpected API response:", result);
  //         setData([]);
  //       }
  //     } catch (err: any) {
  //       setError(err.message || "Unknown error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLogs();
  // }, []);

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker />
      </div>

      <div className={styles.div2}>
        <TrendCard />
      </div>

      {/* <div className={styles.div3}>
        {loading ? (
          <div className={styles.loading}>กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className={styles.error}>❌ เกิดข้อผิดพลาด: {error}</div>
        ) : (
          <LogTable data={data} />
        )}
      </div> */}

      <div className={styles.div3}>
        <LogTable data={data} />
      </div>
    </div>
  );
};

export default Log_main_1;
