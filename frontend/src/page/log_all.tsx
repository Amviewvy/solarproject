import React, { useState } from 'react';
import Header from '../components/nev_bar';
import Log_main_1 from '../components/Log_compare/Log_main_1';
import Log_main_2 from '../components/Log_compare/Log_main_2';

const Log: React.FC = () => {
  const today = new Date();

  const defaultFrom = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const defaultTo = today;

  const [startDate, setStartDate] = useState<Date | null>(defaultFrom);
  const [endDate, setEndDate] = useState<Date | null>(defaultTo);

  return (
    <div>
      <Header title="Log / Compare" />

      <Log_main_1
        startDate={startDate}
        endDate={endDate}
        onRangeChange={(from, to) => {
          setStartDate(from);
          setEndDate(to);
        }}
      />

      <Log_main_2 startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Log;
