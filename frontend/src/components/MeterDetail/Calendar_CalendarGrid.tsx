"use client";

import * as React from "react";
import styles from "./calender.module.css";

interface CalendarGridProps {
  currentDate: Date;
  range: { from: Date | null; to: Date | null };
  setRange: React.Dispatch<
    React.SetStateAction<{ from: Date | null; to: Date | null }>
  >;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  range,
  setRange,
}) => {
  const today = new Date();

  const getDaysInMonth = React.useCallback((year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  }, []);

  const handleDayClick = React.useCallback(
    (day: Date) => {
      if (!range.from || (range.from && range.to)) {
        setRange({ from: day, to: null });
      } else if (range.from && !range.to) {
        if (day < range.from) {
          setRange({ from: day, to: range.from });
        } else {
          setRange({ from: range.from, to: day });
        }
      }
    },
    [range.from, range.to]
  );

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isInRange = (day: Date) => {
    if (!range.from || !range.to) return false;
    return day >= range.from && day <= range.to;
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <>
      <div className={styles.container}>
        {/* Weekday header */}
        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className={styles.daysGrid}>
          {days.map((dayObj, idx) => {
            const { date, isCurrentMonth } = dayObj;
            const isStart = isSameDay(date, range.from);
            const isEnd = isSameDay(date, range.to);
            const inRange = isInRange(date);
            const isToday = isSameDay(date, today);

            return (
              <div key={idx} className={styles.dayCell}>
                {inRange && !isStart && !isEnd && (
                  <div className={styles.inRange} />
                )}
                {isStart && range.to && <div className={styles.rangeStart} />}
                {isEnd && range.from && <div className={styles.rangeEnd} />}

                <button
                  onClick={() => handleDayClick(date)}
                  disabled={!isCurrentMonth}
                  className={`
                  ${styles.dayBtn}
                  ${!isCurrentMonth ? styles.notCurrent : ""}
                  ${isStart || isEnd ? styles.selected : ""}
                  ${isToday && !isStart && !isEnd && isCurrentMonth ? styles.today : ""}
                `}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CalendarGrid;
