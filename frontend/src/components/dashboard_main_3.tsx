import React from 'react';
import styles from "../styles/dashboard_main_3.module.css";
import EnergyPieChart from './EnergyPieChart_body';

const Dashboard_main_3: React.FC = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>1</div>
      <div className={styles.div2}>
        <EnergyPieChart importValue={63} exportValue={25} />
      </div>
      <div className={styles.div3}>3</div>
    </div>
  );
};

export default Dashboard_main_3;