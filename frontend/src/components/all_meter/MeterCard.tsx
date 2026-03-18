import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MeterCard.module.css';

interface MeterCardProps {
  meterId: string;
  name: string;
  voltage: number;
  current: number;
  power: number;
}

const MeterCard: React.FC<MeterCardProps> = ({ meterId, voltage, current, power, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meter/${meterId}`);
  };

  // const formatNumber = (value: number, decimals = 2) => {
  //   return value.toLocaleString('en-US', {
  //     minimumFractionDigits: decimals,
  //     maximumFractionDigits: decimals,
  //   });
  // };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <div className={styles.meterTitle}>{name}</div>
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
                <div className={styles.value}>{voltage.toFixed(4)}</div>
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
                <div className={styles.value}>{current.toFixed(4)}</div>
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
                <div className={styles.value}>{(power / 1000).toFixed(4)}</div>
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
