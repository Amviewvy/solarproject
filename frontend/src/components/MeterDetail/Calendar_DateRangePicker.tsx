"use client";

import * as React from "react";
import { Card } from "../ui/card";
import styles from "./calender.module.css";
import MonthYearPicker from "./Calendar_MonthYearPicker";
import CalendarGrid from "./Calendar_CalendarGrid";
// import FooterRange from "./Calendar_FooterRange";

const DateRangePicker: React.FC = () => {
  const today = new Date();

  const getMonthStartEnd = (date: Date) => {
    const from = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
    const to = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    return { from, to };
  };

  const { from: defaultFrom, to: defaultTo } = getMonthStartEnd(today);

  const [range, setRange] = React.useState<{ from: Date | null; to: Date | null }>({
    from: defaultFrom,
    to: defaultTo,
  });

  const [currentDate, setCurrentDate] = React.useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  return (
    <Card className={styles.card}>
      <MonthYearPicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid
        currentDate={currentDate}
        range={range}
        setRange={setRange}
      />
      {/* <FooterRange range={range} /> */}
    </Card>
  );
};

export default DateRangePicker;
