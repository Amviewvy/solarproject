import React, { useState } from "react";
import styles from "./TrendChart.module.css";
import { Card, CardContent } from "./../ui/card";
import TrendHeader from "./TrendHeader";
import TrendChart from "./TrendChart";

const TrendCard: React.FC = () => {
  const [selectedMeter, setSelectedMeter] = useState("Meter_1");

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.leftSection}>
          <TrendHeader 
            selectedMeter={selectedMeter}
            setSelectedMeter={setSelectedMeter}
          />
        </div>
        <div className={styles.rightSection}>
          <TrendChart 
            selectedMeter={selectedMeter}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;