import React, { useEffect, useState } from "react";
import styles from "../../styles/all_meter.module.css";
import MeterCard from "./MeterCard";

export interface MeterData {
  // meter_id: number;
  // volts_avg: number;
  // current_sum: number;
  // watt_sum: number;

  meter_id: number;
  //meter_name: string;
  avg_voltage: number;
  total_current: number;
  total_power: number;
}


// Mock data function - แทนที่ด้วยการเรียก API จริงของคุณ
// export const fetchMeterData = async (): Promise<MeterData[]> => { // เพิ่ม export
//   // จำลองการเรียก API
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { meter_id: 1, volts_avg: 220, current_sum: 10, watt_sum: 2200 },
//         { meter_id: 2, volts_avg: 230, current_sum: 12.5, watt_sum: 2875 },
//         { meter_id: 3, volts_avg: 218, current_sum: 9.8, watt_sum: 2136 },
//         { meter_id: 4, volts_avg: 225, current_sum: 11.2, watt_sum: 2520 },
//         { meter_id: 5, volts_avg: 215, current_sum: 8.5, watt_sum: 1827.5 },
//         { meter_id: 6, volts_avg: 222, current_sum: 10.8, watt_sum: 2397.6 },
//         { meter_id: 7, volts_avg: 228, current_sum: 11.5, watt_sum: 2622 },
//         { meter_id: 8, volts_avg: 219, current_sum: 9.2, watt_sum: 2014.8 },
//         { meter_id: 9, volts_avg: 232, current_sum: 13.1, watt_sum: 3039.2 },
//         { meter_id: 10, volts_avg: 221, current_sum: 10.3, watt_sum: 2276.3 },
//         { meter_id: 11, volts_avg: 226, current_sum: 11.8, watt_sum: 2666.8 },
//       ]);
//     }, 500);
//   });
// };

//-------New API function-----

export const fetchMeterData = async (): Promise<MeterData[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/measurements/summary`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meter summary");
  }

  const data = await response.json();

  // 🔥 แปลง string → number
  return data.map((m: any) => ({
    meter_id: Number(m.meter_id),
    //meter_name: m.meter_name,
    avg_voltage: Number(m.avg_voltage),
    total_current: Number(m.total_current),
    total_power: Number(m.total_power),
  }));
};

// ✅ ฟังก์ชัน format ตัวเลขให้ไม่ยาวเกินไป + มี comma
const formatNumber = (value: number, decimals = 2) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

//-------End of New API function-----

interface Props {
  targetMeterIds?: number[];
}

const AllMeterWithData: React.FC<Props> = ({ targetMeterIds = [] }) => {
  const [meters, setMeters] = useState<MeterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeterData = async () => {
      try {
        setLoading(true);
        const data = await fetchMeterData();
        
        // ถ้ามีการกำหนด targetMeterIds ให้กรองข้อมูล
        const filteredData = targetMeterIds.length > 0 
          ? data.filter(meter => targetMeterIds.includes(meter.meter_id))
          : data;
        
        setMeters(filteredData);
        setError(null);
      } catch (err) {
        setError("Failed to load meter data");
        console.error("Error fetching meter data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMeterData();
  }, [targetMeterIds]);

  if (loading) {
    return (
      <div className={styles.parent}>
        <div>Loading meter data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.parent}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      {meters.map((m) => (
        <MeterCard
          key={m.meter_id}
          meterId={m.meter_id}
          voltage={m.avg_voltage}
          current={m.total_current}
          power={m.total_power}
        />
      ))}
    </div>
  );
};

export default AllMeterWithData;