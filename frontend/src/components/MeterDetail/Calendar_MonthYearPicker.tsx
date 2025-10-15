"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./calender.module.css";

interface MonthYearPickerProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  compact?: boolean;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ 
  currentDate, 
  setCurrentDate,
  compact = false 
}) => {
  const currentYear = currentDate.getFullYear();

  return (
    <div className={`${styles.header} ${compact ? styles.compactHeader : ''}`}>
      {/* Month dropdown */}
      <div className={styles.dropdownGroup}>
        <button className={`${styles.dropdownBtn} ${compact ? styles.compactBtn : ''}`}>
          <span>{months[currentDate.getMonth()]}</span>
          <ChevronDown className={`${styles.icon} ${compact ? styles.compactIcon : ''}`} />
        </button>
        <div className={`${styles.dropdownMenu} ${compact ? styles.compactMenu : ''}`}>
          <div className={styles.dropdownList}>
            {months.map((month, idx) => (
              <button
                key={month}
                onClick={() => setCurrentDate(new Date(currentYear, idx, 1))}
                className={`${styles.dropdownItem} ${idx === currentDate.getMonth() ? styles.active : ""}`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Year dropdown */}
      <div className={styles.dropdownGroup}>
        <button className={`${styles.dropdownBtn} ${compact ? styles.compactBtn : ''}`}>
          <span>{currentYear}</span>
          <ChevronDown className={`${styles.icon} ${compact ? styles.compactIcon : ''}`} />
        </button>
        <div className={`${styles.dropdownMenu} ${compact ? styles.compactMenu : ''}`}>
          <div className={styles.dropdownList}>
            {Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map((year) => (
              <button
                key={year}
                onClick={() => setCurrentDate(new Date(year, currentDate.getMonth(), 1))}
                className={`${styles.dropdownItem} ${year === currentYear ? styles.active : ""}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthYearPicker;