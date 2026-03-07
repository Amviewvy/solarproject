import React, { useState } from "react";
import styles from "../../styles/Log_main_1.module.css";
import DateRangePicker from "../Calendar_DateRangePicker";
import TrendCard from "./TrendCard";


const API_URL = "http://localhost:3000";


const Log_main_1: React.FC = () => {

  const today = new Date();

  const defaultFrom = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
const defaultTo = today;

  const [startDate, setStartDate] = useState<Date | null>(defaultFrom);
  const [endDate, setEndDate] = useState<Date | null>(defaultTo);


  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker 
          onRangeChange={(range) => {
        setStartDate(range.from);
        setEndDate(range.to);
      }}
            />
      </div>

      <div className={styles.div2}>
        <TrendCard 
        startDate={startDate}
          endDate={endDate}
          baseUrl={API_URL}
        />
      </div>

    </div>
  );
};

export default Log_main_1;
