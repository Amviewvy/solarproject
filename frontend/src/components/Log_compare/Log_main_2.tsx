import React from 'react';
import styles from "../../styles/Log_main_2.module.css";
import MeterComparisonChart from "./MeterComparisonChart";

const Log_main_2: React.FC = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div3}>
        <MeterComparisonChart/>
      </div>
    </div>
  );
};

export default Log_main_2;
