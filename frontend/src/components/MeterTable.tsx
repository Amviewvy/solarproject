import React, { useEffect, useState } from "react";
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

const MeterTable: React.FC = () => {
  const [data, setData] = useState<MeterData[]>([
    {
      id: 1,
      name: "Main",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 2,
      name: "Air Conditioner",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 3,
      name: "Sanitation System",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 4,
      name: "Coffee Shop",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 5,
      name: "Meeting Room",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 6,
      name: "Office Room",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 7,
      name: "Parking Lot",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 8,
      name: "Restroom",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 9,
      name: "Elevator",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 10,
      name: "Lighting",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 11,
      name: "Spare",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 12,
      name: "Main Backup",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
    {
      id: 13,
      name: "Air Conditioner Backup",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 14,
      name: "Sanitation System Backup",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Disable",
    },
    {
      id: 15,
      name: "Coffee Shop Backup",
      volts_avg: 2021,
      current_sum: 2021,
      watt_sum: 2021,
      status: "Approved",
    },
  ]);

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
                      style={{ background: statusColors[row.status] }}
                    ></span>
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