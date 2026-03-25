import React from 'react';
import styles from '../../styles/InverterControl.module.css';
import Inverter_Pic from '../../assets/inverter.png';

type Props = {
  requireLoginThen: (action: () => void) => void;
};

const InverterControl: React.FC<Props> = ({ requireLoginThen }) => {

  const handleAction = (label: string) => {
    requireLoginThen(() => console.log(`🟢 Action: ${label}`));
  };

  return (
    <div className={styles.container}>
      {/* ฝั่งซ้าย: รูปภาพและ Switch Mode */}
      <div className={styles.visualSection}>
      
        <img className={styles.inverterImage} src={Inverter_Pic} alt="Inverter" draggable={false} />
        
        <div className={styles.statusDisplay}>
          <div className={styles.powerDisplay}>
            <span className={styles.powerLabel}>Live Power</span>
            <span className={styles.powerValue}>0 W</span>
          </div>
          <div className={styles.statusBox}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Disconnected</span>
          </div>
        </div>
      </div>

      {/* ฝั่งขวา: แผงควบคุม */}
      <div className={styles.controlPanel}>
        {/* กลุ่มปุ่มหลัก */}
        <div className={styles.mainActions}>
          <button className={`${styles.button} ${styles.start}`} onClick={() => handleAction('Start')}>Start</button>
          <button className={`${styles.button} ${styles.stop}`} onClick={() => handleAction('Stop')}>Stop</button>
        </div>

        <div className={styles.scrollArea}>
          {/* Section: Power Factor */}
          <div className={styles.card}>
            <label className={styles.cardTitle}>Power Factor (PF)</label>
            <p className={styles.hint}>1-20 (Lag) | 80-100 (Lead)</p>
            <div className={styles.inputRow}>
              <input type="number" defaultValue="100" className={styles.inputBox} />
              <button className={styles.orangeButton} onClick={() => handleAction('Set PF')}>Set PF</button>
            </div>
          </div>

          {/* Section: Power Setting */}
          <div className={styles.card}>
            <label className={styles.cardTitle}>Active Power</label>
            <p className={styles.hint}>Range: 100 - 5000 W</p>
            <div className={styles.inputRow}>
              <input type="number" defaultValue="100" className={styles.inputBox} />
              <button className={styles.orangeButton} onClick={() => handleAction('Set Power')}>Set Power</button>
            </div>
          </div>

          {/* กลุ่มปุ่มย่อย */}
          <div className={styles.secondaryActions}>
            <button className={styles.outlineButton} onClick={() => handleAction('Read')}>Read</button>
            <button className={styles.outlineButton} onClick={() => handleAction('Auto')}>Read Auto</button>
            <button className={styles.outlineButton} onClick={() => handleAction('fA')}>Read fA</button>
            <button className={styles.outlineButton} onClick={() => handleAction('Reg81')}>Reg 81</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterControl;