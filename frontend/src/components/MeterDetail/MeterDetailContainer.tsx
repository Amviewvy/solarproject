// src/components/MeterDetailContainer.tsx
"use client";
import React, { useState } from "react";
import MeterDetail_main_1 from "./MeterDetail_main_1";
import MeterDetail_main_2 from "./MeterDetail_main_2";

const MeterDetailContainer: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  return (
    <div>
      <MeterDetail_main_1 
        dateRange={dateRange} 
        onDateRangeChange={setDateRange} 
      />
      <MeterDetail_main_2 
        dateRange={dateRange}
      />
    </div>
  );
};

export default MeterDetailContainer;