import React from "react";
import styles from "../styles/TrendChart.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TrendHeaderProps {
  selectedTrend: string;
  setSelectedTrend: (value: string) => void;
}

const TrendHeader: React.FC<TrendHeaderProps> = ({
  selectedTrend,
  setSelectedTrend,
}) => {
  const trendOptions = [
    "SUM",
    "Volt",
    "Current",
    "VA",
    "VAR",
    "PF",
  ];

  const handleSelectChange = (value: string) => {
    setSelectedTrend(value);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <h3 className={styles.headerTitle}>Trend Overview</h3>

        {/* ใช้ Select ของ shadcn/ui */}
        <Select onValueChange={handleSelectChange} value={selectedTrend}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder="Select trend" />
          </SelectTrigger>
          <SelectContent>
            {trendOptions.map((option) => (
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
