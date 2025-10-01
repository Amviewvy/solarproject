import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import styles from "../styles/MediumTraffic.module.css";

const MediumTraffic: React.FC = () => {
  const times = ["00", "04", "08", "12", "14", "16", "18"];
  const barHeights = [133, 94, 185, 116, 156, 205, 55];

  // state สำหรับเปลี่ยนข้อความ
  const [title, setTitle] = useState("Energy usage");

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.subtitle}>{title}</p>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>2.579</h2>
              <span className={styles.unit}>kWh</span>
            </div>
          </div>

          <Select onValueChange={(val) => setTitle(val)}>
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Energy Consumption">Energy export</SelectItem>
              <SelectItem value="Energy Input">Energy import</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <div className={styles.chart}>
          {barHeights.map((h, i) => (
            <div key={i} className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{
                  height: `${h}px`,
                }}
              />
              <span className={styles.timeLabel}>{times[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediumTraffic;