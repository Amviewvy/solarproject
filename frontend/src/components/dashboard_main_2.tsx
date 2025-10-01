import React from "react";
import styles from "../styles/dashboard_main_2.module.css";
import DateRangePicker from "./Calendar_DateRangePicker";

const Dashboard_main_2: React.FC = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker />
      </div>
      <div className={styles.div2}>2</div>
    </div>
  );
};

export default Dashboard_main_2;
