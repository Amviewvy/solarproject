import React from "react";
import styles from "../../styles/MeterCard.module.css";

interface MeterCardProps {
  meterId: number;
  voltage: number;
  current: number;
  power: number;
}

const MeterCard: React.FC<MeterCardProps> = ({
  meterId,
  voltage,
  current,
  power,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <div className={styles.meterTitle}>Meter : {meterId}</div>
        </div>

        {/* Voltage */}
        <div className={styles.section}>
          <div className={styles.sectionBox}>
            <div className={styles.valueGroup}>
              <div className={`${styles.dot} ${styles.indigoDot}`} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Ave</div>
              </div>
              <div className={styles.valueWrapper}>
                <div className={styles.value}>{voltage}</div>
              </div>
            </div>
            <div className={styles.unitWrapper}>
              <div className={styles.unit}>V(v)</div>
            </div>
          </div>
        </div>

        {/* Current */}
        <div className={styles.section}>
          <div className={styles.sectionBox}>
            <div className={styles.valueGroup}>
              <div className={`${styles.dot} ${styles.limeDot}`} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Sum</div>
              </div>
              <div className={styles.valueWrapper}>
                <div className={styles.value}>{current}</div>
              </div>
            </div>
            <div className={styles.unitWrapper}>
              <div className={styles.unit}>A(a)</div>
            </div>
          </div>
        </div>

        {/* Power */}
        <div className={styles.section}>
          <div className={styles.sectionBox}>
            <div className={styles.valueGroup}>
              <div className={`${styles.dot} ${styles.orangeDot}`} />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>Sum</div>
              </div>
              <div className={styles.valueWrapper}>
                <div className={styles.value}>{power}</div>
              </div>
            </div>
            <div className={styles.unitWrapper}>
              <div className={styles.unit}>P(w)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterCard;
