import React from "react";
import styles from "../styles/SmallEarnings.module.css"; 

type SmallCardProps = {
  icon: string;
  label: string;
  value: string | number;
  iconColor?: "iconGreen" | "iconBlue" | "iconRed";
};

const SmallCard: React.FC<SmallCardProps> = ({ icon, label, value ,iconColor = "iconGreen",}) => {
  return (
    <div className={styles.smallEarnings}>
      <div className={`${styles.icon} ${styles[iconColor]}`} data-layer="Icon">
        <span className={styles.iconInner} aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className={styles.text} data-layer="Text">
        <h3 className={styles.label} data-layer="Label">
          {label}
        </h3>
        <p className={styles.value} data-layer="Value">
          <strong>{value}</strong>
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
