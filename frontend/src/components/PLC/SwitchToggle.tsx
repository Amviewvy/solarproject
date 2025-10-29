import React from "react";
import styles from "../../styles/SwitchToggle.module.css";

interface SwitchToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  delay?: number;
  size?: "small" | "medium" | "large";
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ 
  label, 
  checked, 
  onChange,
  size = "medium"
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  return (
    <div 
      className={styles.switchContainer}
      style={{ 
        display: "inline-flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "6px" 
      }}
    >
      {label && (
        <span 
          className={styles.label}
          style={{ 
            fontSize: "clamp(12px, 2.5vw, 14px)", 
            color: "#333",
            textAlign: "center"
          }}
        >
          {label}
        </span>
      )}
      <label className={`${styles.switch} ${getSizeClass()}`}>
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