import React from "react";
import styles from "../../styles/InverterControl.module.css";

type Props = {
  // ฟังก์ชันที่ส่งมาจากหน้า ControlPLC เพื่อเช็ก login ก่อนทำงาน
  requireLoginThen: (action: () => void) => void;
};

const InverterControl: React.FC<Props> = ({ requireLoginThen }) => {

  const handleStart = () => {
    console.log("🟢 Inverter Start Command Sent");
    alert("✅ Inverter started!");
    // ตัวอย่าง fetch จริง:
    // fetch(`${apiUrl}/plc/start`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
  };

  const handleStop = () => {
    console.log("🔴 Inverter Stop Command Sent");
    alert("🛑 Inverter stopped!");
  };

  const handleSetPF = () => {
    console.log("⚙️  Set Power Factor Command Sent");
    alert("PF value set!");
  };

  const handleSetPower = () => {
    console.log("⚡ Set Power Command Sent");
    alert("Power value set!");
  };



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
          <button className={`${styles.button} ${styles.start}`}
          onClick={() => requireLoginThen(handleStart)}>▶ Start</button>
          <button className={`${styles.button} ${styles.stop}`} 
          onClick={() => requireLoginThen(handleStop)}>⏹ Stop</button>
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
            <button className={styles.orangeButton}
             onClick={() => requireLoginThen(handleSetPF)}>Set PF</button>
          </div>
        </div>

        {/* Power Section */}
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <span>100 - 5000 W</span>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" defaultValue="10" className={styles.inputBox} />
            <button className={styles.orangeButton}
             onClick={() => requireLoginThen(handleSetPower)}>Set Power</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterControl;
