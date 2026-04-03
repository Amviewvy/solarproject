import React, { useState } from 'react';
import styles from '../../styles/Log_main_1.module.css';
import DateRangePicker from '../Calendar_DateRangePicker';
import TrendCard from './TrendCard';

const API_URL = import.meta.env.VITE_API_URL;

interface LogMain1Props {
  startDate: Date | null;
  endDate: Date | null;
  onRangeChange: (from: Date | null, to: Date | null) => void;
}

const Log_main_1: React.FC<LogMain1Props> = ({ startDate, endDate, onRangeChange }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker
          onRangeChange={(range) => {
            onRangeChange(range.from, range.to);
          }}
        />
      </div>

      <div className={styles.div2}>
        <TrendCard startDate={startDate} endDate={endDate} baseUrl={API_URL} />
      </div>
    </div>
  );
};

export default Log_main_1;
