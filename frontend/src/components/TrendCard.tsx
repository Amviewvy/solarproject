import React, { useState } from "react";
import styles from "../styles/TrendChart.module.css";
import { Card, CardContent } from "./ui/card";
import TrendHeader from "./TrendHeader";
import TrendChart from "./TrendChart";

const TrendCard: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState("Current");

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.leftSection}>
          <TrendHeader selectedTrend={selectedTrend} setSelectedTrend={setSelectedTrend} />
        </div>
        <div className={styles.rightSection}>
          <TrendChart selectedTrend={selectedTrend} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
