import React, { useEffect, useState } from 'react';
import styles from '../../styles/InverterControl.module.css';
import Inverter_Pic from '../../assets/inverter.png';
import { socket } from '../../socket';

type Props = {
  requireLoginThen: (action: () => void) => void;
};

// ข้อมูลที่รับมาจาก C# ผ่าน Socket
interface InverterData {
  type: string;
  vpv1: number;
  vpv2: number;
  ipv1: number;
  ipv2: number;
  vac1: number;
  vac2: number;
  vac3: number;
  iac1: number;
  iac2: number;
  iac3: number;
  frequency: number;
  power: number;
  status: number;
  statusText: string;
  temperature: number;
  eTotal: number;
  eDay: number;
  updatedAt: string;
}

const defaultData: InverterData = {
  type: 'inverterData',
  vpv1: 0, vpv2: 0, ipv1: 0, ipv2: 0,
  vac1: 0, vac2: 0, vac3: 0,
  iac1: 0, iac2: 0, iac3: 0,
  frequency: 0, power: 0, status: 0,
  statusText: 'Wait', temperature: 0,
  eTotal: 0, eDay: 0, updatedAt: '',
};

const InverterControl: React.FC<Props> = ({ requireLoginThen }) => {
  const [data, setData] = useState<InverterData>(defaultData);
  const [isConnected, setIsConnected] = useState(false);
  const [powerInput, setPowerInput] = useState('100');
  const [pfInput, setPfInput] = useState('100');

  // ==================== Socket ====================

  useEffect(() => {
    socket.connect();

    // รับข้อมูล Inverter จาก C# ผ่าน NestJS
    const onInverterData = (payload: InverterData) => {
      setData(payload);
      setIsConnected(true);
    };

    socket.on('inverterData', onInverterData);

    return () => {
      socket.off('inverterData', onInverterData);
    };
  }, []);

  // ==================== Commands ====================

  const sendCommand = (action: string, value?: number) => {
    requireLoginThen(() => {
      const payload: any = { action };
      if (value !== undefined) payload.value = value;
      socket.emit('inverterCommand', payload);
      console.log('➡️ inverterCommand:', payload);
    });
  };

  // ==================== UI ====================

  return (
    <div className={styles.container}>
      {/* ฝั่งซ้าย */}
      <div className={styles.visualSection}>
        <img className={styles.inverterImage} src={Inverter_Pic} alt="Inverter" draggable={false} />

        <div className={styles.statusDisplay}>
          <div className={styles.powerDisplay}>
            <span className={styles.powerLabel}>Live Power</span>
            <span className={styles.powerValue}>{data.power.toFixed(0)} W</span>
          </div>

          <div className={styles.statusBox}>
            <span
              className={styles.statusDot}
              style={{ background: isConnected ? '#4caf50' : '#f44336' }}
            />
            <span className={styles.statusText}>
              {isConnected ? data.statusText : 'Disconnected'}
            </span>
          </div>

          {/* ข้อมูลเพิ่มเติม */}
          {isConnected && (
            <div className={styles.dataGrid} style={{
              marginTop: 12,
              fontSize: '13px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 16px',
              color: '#333'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#666' }}>Freq:</strong>
                <span>{data.frequency.toFixed(2)} Hz</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#666' }}>Temp:</strong>
                <span>{data.temperature.toFixed(1)} °C</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#666' }}>E-Day:</strong>
                <span>{data.eDay.toFixed(1)} kWh</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#666' }}>E-Total:</strong>
                <span>{data.eTotal.toFixed(1)} kWh</span>
              </div>

              {/* ส่วนของ PV และ Grid สามารถใช้แบบเต็มแถวเพื่อให้อ่านง่ายขึ้น */}
              <div style={{ gridColumn: 'span 2', borderTop: '1px solid #eee', paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <strong style={{ color: '#666' }}>PV1:</strong>
                  <span>{data.vpv1.toFixed(1)}V / {data.ipv1.toFixed(1)}A</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <strong style={{ color: '#666' }}>PV2:</strong>
                  <span>{data.vpv2.toFixed(1)}V / {data.ipv2.toFixed(1)}A</span>
                </div>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: 10, fontSize: 11, color: '#888' }}>
                <span>L1: {data.vac1.toFixed(1)}V</span>
                <span>L2: {data.vac2.toFixed(1)}V</span>
                <span>L3: {data.vac3.toFixed(1)}V</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ฝั่งขวา */}
      <div className={styles.controlPanel}>
        {/* Start / Stop */}
        <div className={styles.mainActions}>
          <button
            className={`${styles.button} ${styles.start}`}
            onClick={() => sendCommand('start')}
          >
            Start
          </button>
          <button
            className={`${styles.button} ${styles.stop}`}
            onClick={() => sendCommand('stop')}
          >
            Stop
          </button>
        </div>

        <div className={styles.scrollArea}>
          {/* Power Factor */}
          <div className={styles.card}>
            <label className={styles.cardTitle}>Power Factor (PF)</label>
            <p className={styles.hint}>1-20 (Lag) | 80-100 (Lead)</p>
            <div className={styles.inputRow}>
              <input
                type="number"
                value={pfInput}
                onChange={(e) => setPfInput(e.target.value)}
                className={styles.inputBox}
              />
              <button
                className={styles.orangeButton}
                onClick={() => sendCommand('setPF', Number(pfInput))}
              >
                Set PF
              </button>
            </div>
          </div>

          {/* Active Power */}
          <div className={styles.card}>
            <label className={styles.cardTitle}>Active Power</label>
            <p className={styles.hint}>Range: 0 - 100 (%)</p>
            <div className={styles.inputRow}>
              <input
                type="number"
                value={powerInput}
                onChange={(e) => setPowerInput(e.target.value)}
                className={styles.inputBox}
              />
              <button
                className={styles.orangeButton}
                onClick={() => sendCommand('setPower', Number(powerInput))}
              >
                Set Power
              </button>
            </div>
          </div>

          {/* Secondary Actions */}
          {/* <div className={styles.secondaryActions}>
            <button className={styles.outlineButton} onClick={() => sendCommand('read')}>
              Read
            </button>
            <button className={styles.outlineButton} onClick={() => sendCommand('read')}>
              Read Auto
            </button>
            <button className={styles.outlineButton} onClick={() => sendCommand('readFreqA')}>
              Read fA
            </button>
            <button className={styles.outlineButton} onClick={() => sendCommand('readFreqA')}>
              Reg 81
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InverterControl;
