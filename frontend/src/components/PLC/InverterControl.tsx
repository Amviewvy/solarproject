import React from "react";
import styles from "../../styles/InverterControl.module.css";

const InverterControl: React.FC = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.inverterImage}
        src="src/assets/inverter.png"
        alt="Goodwe Inverter"
        draggable={false}
      />

      <div className={styles.controlPanel}>
        {/* Start / Stop Buttons */}
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.start}`}>▶ Start</button>
          <button className={`${styles.button} ${styles.stop}`}>⏹ Stop</button>
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
            <button className={styles.orangeButton}>Set PF</button>
          </div>
        </div>

        {/* Power Section */}
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <span>100 - 5000 W</span>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" defaultValue="10" className={styles.inputBox} />
            <button className={styles.orangeButton}>Set Power</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterControl;
