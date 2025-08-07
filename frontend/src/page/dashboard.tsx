// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dashboard.module.css';

interface DashboardItem {
  name: string;
  power: number;
  lastUpdate: string;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardItem[]>([]);
  const [summary, setSummary] = useState<{ totalDevice: number; totalEnergy: number } | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/dashboard`)
      .then(res => {
        console.log('API response:', res.data);
        const apiData = res.data.data ?? [];
        setData(apiData);
        setSummary({
          totalDevice: res.data.totalDevice,
          totalEnergy: res.data.totalEnergy
        });
      })
      .catch((err) => {
        console.error('โหลดข้อมูลไม่สำเร็จ:', err);
        alert('โหลดข้อมูลไม่สำเร็จ');
      });
  }, []);

  return (
    <div className='p-0'>
      <h2 className="text-left-top text-2xl font-bold">
        Dashboard
      </h2>

      {summary && (
        <div>
          <p>จำนวนอุปกรณ์ทั้งหมด: {summary.totalDevice}</p>
          <p>พลังงานรวม: {summary.totalEnergy} W</p>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ชื่ออุปกรณ์</th>
            <th>กำลังไฟ (W)</th>
            <th>อัปเดตล่าสุด</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.power}</td>
              <td>{new Date(item.lastUpdate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
