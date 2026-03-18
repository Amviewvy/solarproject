import React from 'react';
import styles from '../../styles/InverterControl.module.css';

import Inverter_Pic from '../../assets/inverter.png';

type Props = {
  requireLoginThen: (action: () => void) => void;
};

const InverterControl: React.FC<Props> = ({ requireLoginThen }) => {
  const handleStart = () => {
    console.log('🟢 Start Inverter');
    // ตัวอย่าง: เรียก API จริง
    // fetch("/api/plc/start", { method: "POST", headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
  };

  // const handleStop = () => {
  //   console.log('🔴 Stop Inverter');
  // };

  // const handleSetPF = () => {
  //   console.log('⚙️  Set Power Factor Command Sent');
  //   alert('PF value set!');
  // };

  // const handleSetPower = () => {
  //   console.log('⚡ Set Power Command Sent');
  //   alert('Power value set!');
  // };

  return (
    <div className={styles.container}>
      <img
        className={styles.inverterImage}
        src={Inverter_Pic}
        alt="Goodwe Inverter"
        draggable={false}
      />

      <div className={styles.controlPanel}>
        {/* Start / Stop Buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.start}`}
            onClick={() => requireLoginThen(handleStart)}
          >
            ▶ Start
          </button>
          <button
            className={`${styles.button} ${styles.stop}`}
            onClick={() => requireLoginThen(handleStart)}
          >
            ⏹ Stop
          </button>
        </div>

        {/* Power Factor Section */}
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <span>
              1 - 20 → PF 0.99 - 0.80 Lag <br />
              80 - 100 → PF 0.80 - 1.00 Lead
            </span>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" defaultValue="100" className={styles.inputBox} />
            <button className={styles.orangeButton} onClick={() => requireLoginThen(handleStart)}>
              Set PF
            </button>
          </div>
        </div>

        {/* Power Section */}
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <span>100 - 5000 W</span>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" defaultValue="10" className={styles.inputBox} />
            <button className={styles.orangeButton} onClick={() => requireLoginThen(handleStart)}>
              Set Power
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterControl;
