import React from "react";
import styles from "../../styles/SwitchToggle.module.css";

interface SwitchToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ label, checked, onChange }) => {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      {label && <span style={{ fontSize: "14px", color: "#333" }}>{label}</span>}
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.cb}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.toggle}>
          <span className={styles.left}>off</span>
          <span className={styles.right}>on</span>
        </span>
      </label>
    </div>
  );
};

export default SwitchToggle;
