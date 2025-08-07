import React from 'react';
import styles from './DeviceTable.module.css';

interface DashboardItem {
  name: string;
  power: number;
  lastUpdate: string;
}

interface Props {
  data: DashboardItem[];
}

const DeviceTable: React.FC<Props> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ชื่ออุปกรณ์</th>
          <th>กำลังไฟ (W)</th>
          <th>เวลาอัปเดตล่าสุด</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.power}</td>
            <td>{new Date(item.lastUpdate).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeviceTable;
