// src/components/MeterDetail_main_1.tsx
"use client";
import React from "react";
import styles from "./MeterDetail_main_1.module.css";
import SmallEarnings from "../total_average.tsx";
import EnergyPieChart from '../EnergyPieChart_body';
import DateRangePicker from "../Calendar_DateRangePicker";
import MediumTraffic from "../energy_use.tsx";

interface MeterDetail_main_1Props {
  dateRange: { from: Date | null; to: Date | null };
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
}

const MeterDetail_main_1: React.FC<MeterDetail_main_1Props> = ({ 
  dateRange, 
  onDateRangeChange 
}) => {
  const data = [
    {
      icon: "V",
      label: "Average Voltage (Volt)",
      value: 227.957,
      iconColor: "iconGreen",
    },
    {
      icon: "A",
      label: "Average Current (Amp)",
      value: 5.23,
      iconColor: "iconRed",
    },
    {
      icon: "W",
      label: "Average Power (Watt)",
      value: 1200,
      iconColor: "iconBlue",
    },
  ];

  const trafficData = [
    { time: "00", value: 133 },
    { time: "04", value: 94 },
    { time: "08", value: 185 },
    { time: "12", value: 116 },
    { time: "14", value: 156 },
    { time: "16", value: 205 },
    { time: "18", value: 55 },
  ];

  return (
    <div className={styles.parent}>
      <div className={styles.div4}>
        <DateRangePicker onRangeChange={onDateRangeChange} />
      </div>
      <div className={styles.div5}>
        <EnergyPieChart importValue={53} exportValue={34} />
      </div>
      <div className={styles.div6}>
        <MediumTraffic initialData={trafficData} />
      </div>
      <div
        className={styles.div8}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "nowrap" }}
      >
        {data.map((item, index) => (
          <SmallEarnings
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            iconColor={item.iconColor as "iconGreen" | "iconRed" | "iconBlue"}
          />
        ))}
      </div>
    </div>
  );
};

export default MeterDetail_main_1;