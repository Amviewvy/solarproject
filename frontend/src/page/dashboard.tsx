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
    axios.get(`${import.meta.env.VITE_API_URL}/dashboard/summary`)
    
      .then(res => {
        //console.log('API response:', res.data);
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
    <div className = {styles.container}>
      <nav className={styles.sidebar}>
        <div>
        <h1 className="text-center text-xl font-bold mb-6 ">Solar</h1>
        <ul className="space-y-4">
          <li><a href="#" className="hover:underline">Dashboard</a></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><a href="#" className="hover:underline">Logout</a></li>
        </ul>
      </div>
          
        
      </nav>
    <main className={styles.content}>
      <h1 className="text-white text-2xl font-bold mb-6 ">Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.infobox}>Energy</div>
        <div className={styles.infobox}>Parameter</div>
        <div className={styles.infobox}>Control PLC</div>
        <div className={styles.infobox}>Energy Forcast</div>
        <div className={styles.infobox}>Temp</div>
        <div className={styles.infobox}>Control Inverter</div>
      </div>
      
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
      </main>
    </div>
  );
};

export default Dashboard;
