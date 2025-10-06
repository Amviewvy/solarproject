import React from "react";
import styles from "../../styles/plc_inverter_log.module.css";

const LogBox: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundBox}></div>
      <div className={styles.labelBox}>
        <div className={styles.labelText}>Log</div>
      </div>
    </div>
  );
};

export default LogBox;
