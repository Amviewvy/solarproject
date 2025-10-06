import React from "react";
import styles from "./TrendChart.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../ui/select";

interface TrendHeaderProps {
  selectedMeter: string;
  setSelectedMeter: (value: string) => void;
}

const TrendHeader: React.FC<TrendHeaderProps> = ({
  selectedMeter,
  setSelectedMeter,
}) => {

  const meterOptions = Array.from({ length: 11 }, (_, i) => `Meter_${i + 1}`);

  const handleMeterChange = (value: string) => {
    setSelectedMeter(value);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <h3 className={styles.headerTitle}>Trend Overview</h3>

        {/* Meter Selection */}
        <Select onValueChange={handleMeterChange} value={selectedMeter}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder="Select meter" />
          </SelectTrigger>
          <SelectContent>
            {meterOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TrendHeader;