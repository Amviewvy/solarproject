import React, { useEffect,useState } from "react";

import styles from "../styles/MeterTable.module.css";

type StatusType = "Approved" | "Disable";

interface MeterData {
  id: number;
  name: string;
  volts_avg: number;
  current_sum: number;
  watt_sum: number;
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
  Approved: "#05CD99",
  Disable: "#EE5D50",
};


const apiUrl: string = import.meta.env.VITE_API_URL;

const METER_IDS = Array.from({ length: 11 }, (_, i) => i + 1);

const meterNames: Record<number, string> = {
  1: "Main Building",
  2: "Gearlaxy Space",
  3: "Sanitary room",
  4: "Coffee Shop",
  5: "Inverters Overall",
  6: "Electric Control Room",
  7: "Inverter 1",
  8: "Inverter 2",
  9: "Inverter 3",
  10: "solation grid-tied PV Protection",
  11: "solation AC Protection",
};

async function fetchLatestMeasurement(meterId: number) {
  const res = await fetch(`${apiUrl}/measurements/?meter_id=${meterId}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`meter ${meterId}: HTTP ${res.status}`);
  const json = await res.json();

  const dataArr = Array.isArray(json?.data) ? json.data : [];
  if (dataArr.length === 0) throw new Error(`meter ${meterId}: no data`);

  // 🔸 เอาเรคคอร์ดล่าสุด (ตัวท้ายสุดของ array)
  const latest = dataArr[dataArr.length - 1];

  return {
    id: latest.meter?.id ?? meterId,
  name: meterNames[meterId] ?? latest.meter?.name ?? `Meter ${meterId}`, // ← override ที่นี่
  volts_avg: parseFloat(latest.volts_avg),
  current_sum: parseFloat(latest.current_sum),
  watt_sum: parseFloat(latest.watt_sum),
  status: parseFloat(latest.watt_sum) > 0 ? "Approved" : "Disable",
  };
}


const MeterTable: React.FC = () => {
  const [data,setData] = useState<MeterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

         const fetchMeters = async () => {
    setLoading(true);
    setError(null);
    try {
      // 🔹 ดึงทุก meter_id พร้อมกัน
      const results = await Promise.allSettled(
        METER_IDS.map((id) => fetchLatestMeasurement(id))
      );

      const ok = results
        .filter((r): r is PromiseFulfilledResult<MeterData> => r.status === "fulfilled")
        .map((r) => r.value)
        .sort((a, b) => a.id - b.id);

      setData(ok);

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) setError(`บางมิเตอร์โหลดไม่สำเร็จ: ${failed.length}`);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchMeters();
  const t = setInterval(fetchMeters, 10000);
  return () => clearInterval(t);
}, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Meter Table</h2>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Volts avg</th>
              <th>Current sum</th>
              <th>Watt sum</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={`${row.id}-${row.name}-${Math.random()}`}>
                <td>{row.id}</td>
                <td className={styles.nameCell}>{row.name}</td>
                <td>{row.volts_avg}</td>
                <td>{row.current_sum}</td>
                <td>{row.watt_sum}</td>
                <td>
                  <div className={styles.statusCell}>
                    <span
                      className={styles.statusDot}
                      style={{ background: statusColors[row.status] }}></span>
                    <span>{row.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeterTable;
