// src/components/dashboard_main_2.tsx
import React, { useState } from "react";
import styles from "../styles/dashboard_main_2.module.css";
import DateRangePicker from "./Calendar_DateRangePicker";
import TrendCard from "./TrendCard";

const Dashboard_main_2: React.FC = () => {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker onRangeChange={setRange} />
      </div>
      <div className={styles.div2}>
        <TrendCard
          startDate={range.from}
          endDate={range.to}
          meterId={1}
          baseUrl="http://localhost:3000" 
        />
      </div>
    </div>
  );
};

export default Dashboard_main_2;
