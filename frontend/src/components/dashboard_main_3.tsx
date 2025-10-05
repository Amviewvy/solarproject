import React from 'react';
import styles from "../styles/dashboard_main_3.module.css";
import EnergyPieChart from './EnergyPieChart_body';
import MediumSafety from './PLC_inverter_control';
import MeterTable from './MeterTable';

const Dashboard_main_3: React.FC = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <MeterTable />
      </div>
      <div className={styles.div2}>
        <EnergyPieChart importValue={63} exportValue={25} />
      </div>
      <div className={styles.div3}>
        <MediumSafety />  
      </div>
    </div>
  );
};

export default Dashboard_main_3;