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


function pickLatest(recArr: any[]): any | null {
  if (!Array.isArray(recArr) || recArr.length === 0) return null;
  // กันกรณี array ไม่ได้เรียงเวลา: หาตัวที่ measurement_time มากที่สุด
  return recArr.reduce((best, cur) => {
    const bt = Date.parse(best?.measurement_time ?? "") || -Infinity;
    const ct = Date.parse(cur?.measurement_time ?? "") || -Infinity;
    return ct > bt ? cur : best;
  }, recArr[0]);
}

const meterNames: Record<number, string> = {
  1: "Main Building",
  2: "Gearlaxy Space",
  3: "Sanitary Room",
  4: "Coffee Shop",
  5: "Inverters Overall",
  6: "Electric Control Room",
  7: "Inverter 1",
  8: "Inverter 2",
  9: "Iverter 3",
  10: "Solation grid-tird PV Protedction",
  11: "solation AC Protection",
};

async function fetchLatestMeasurement(meterId: number, signal?: AbortSignal) {
  const url = `${apiUrl}/measurements/?meter_id=${meterId}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`meter ${meterId}: HTTP ${res.status} ${text.slice(0,120)}`);
  }

  const json = await res.json().catch((e) => {
    throw new Error(`meter ${meterId}: invalid JSON (${e?.message})`);
  });

  // รองรับทั้ง {data:[...]} และ [...] โดยตรง
  const arr: any[] = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
  if (arr.length === 0) throw new Error(`meter ${meterId}: no data`);

  const latest = pickLatest(arr);
  if (!latest) throw new Error(`meter ${meterId}: no latest record`);

  // DEBUG: ดูค่าที่ได้จริง
  console.log(`[meter ${meterId}] latest`, latest);

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllMeters = async () => {
    setLoading(true);
    setError(null);

    // 0) guard ค่า API URL
    if (!apiUrl) {
      setError("VITE_API_URL ว่าง: โปรดตั้งค่าใน .env แล้วรีสตาร์ท dev server");
      setLoading(false);
      return;
    }

    const ac = new AbortController();
    const { signal } = ac;
    try {
      console.log("VITE_API_URL =", apiUrl);

      // 1) ยิงพร้อมกันทุก id (เห็น error รายตัวแบบไม่ล้มทั้งชุด)
      const settled = await Promise.allSettled(
        METER_IDS.map((id) => fetchLatestMeasurement(id, signal))
      );

      // 2) รวมตัวที่สำเร็จ
      const ok = settled
        .filter((r): r is PromiseFulfilledResult<{ id:number; name:string; volts_avg:number; current_sum:number; watt_sum:number }> => r.status === "fulfilled")
        .map((r) => r.value);

      const table: MeterData[] = ok
        .map((m) => ({
          id: m.id,
          name: m.name,
          volts_avg: m.volts_avg,
          current_sum: m.current_sum,
          watt_sum: m.watt_sum,
          status: (m.watt_sum > 0 ? "Approved" : "Disable") as StatusType,
        }))
        .sort((a, b) => a.id - b.id);

      setData(table);

      // 3) รวม error ของตัวที่พัง (ถ้ามี)
      const failed = settled.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
      if (failed.length > 0) {
        console.warn("Some meters failed:", failed.map((f) => f.reason?.message || f.reason));
        setError(`โหลดไม่สำเร็จบางมิเตอร์: ${failed.length} ตัว (ดู console เพิ่มเติม)`);
      }

      // 4) ถ้าไม่มีแถวเลย ให้โชว์ข้อความเพื่อเช็คง่าย
      if (table.length === 0 && !failed.length) {
        setError("ไม่พบข้อมูลล่าสุดของทุกมิเตอร์ (data ว่าง)");
      }
    } catch (e: any) {
      console.error("loadAllMeters error:", e);
      setError(e?.message ?? "Load failed");
    } finally {
      setLoading(false);
    }

    return () => ac.abort();
  };

  useEffect(() => {
    loadAllMeters();
    // ถ้าต้องการ refresh อัตโนมัติ:
     const t = setInterval(loadAllMeters, 10000);
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
