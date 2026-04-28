import React, { useEffect, useState } from 'react';

import styles from '../styles/MeterTable.module.css';
import { type Device } from '../types/common';
import { socket } from '../socket';

type StatusType = 'online' | 'offline';

interface MeterData {
  id: string;
  name: string;
  volts_avg: number;
  current_sum: number;
  watt_sum: number;
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
  online: '#05CD99',
  offline: '#EE5D50',
};

const apiUrl: string = import.meta.env.VITE_API_URL;

const MeterTable: React.FC = () => {
  const [data, setData] = useState<MeterData[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  async function fetchMeterWithTrendData() {
    const ids = devices.map((d) => d.id).join(',');
    if (ids.length > 0) {
      try {
        const res = await fetch(`${apiUrl}/devices/trend-latest?device_ids=${ids}`);
        const json = await res.json();
        const meterData = json.data.map((m: any) => ({
          id: m.device_id,
          name: m.device_name,
          volts_avg: m.volts_ave,
          current_sum: m.current_sum,
          watt_sum: m.power_sum,
          status: m.status,
        }));
        setData(meterData);
      } catch (error) {
        console.error('error meter table: ', error);
      }
    }
  }

  async function fetchDevices() {
    try {
      const response = await fetch(`${apiUrl}/devices?device_type=meter`);
      const rawJson = await response.json();
      const devices = rawJson.result;
      setDevices(devices);
    } catch (error) {
      console.error('error when fetch decices at meter Table: ', error);
      setDevices([]);
    }
  }

  useEffect(() => {
    fetchMeterWithTrendData();
  }, [devices]);

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    const onMeasurementUpdated = () => {
      fetchMeterWithTrendData();
    };

    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, [devices]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Meter Table</h2>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {/* <th>ID</th> */}
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
                {/* <td>{row.id}</td> */}
                <td className={styles.nameCell}>{row.name}</td>
                <td>{row.volts_avg.toFixed(4)}</td>
                <td>{row.current_sum.toFixed(4)}</td>
                <td>{row.watt_sum.toFixed(4)}</td>
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
