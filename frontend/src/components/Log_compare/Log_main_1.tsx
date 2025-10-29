import React from "react";
import styles from "../../styles/Log_main_1.module.css";
import DateRangePicker from "../Calendar_DateRangePicker";
import TrendCard from "./TrendCard";

const Log_main_1: React.FC = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker />
      </div>

      <div className={styles.div2}>
        <TrendCard />
      </div>

    </div>
  );
};

export default Log_main_1;
