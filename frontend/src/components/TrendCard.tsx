import React, { useState } from "react";
import styles from "../styles/TrendChart.module.css";
import { Card, CardContent } from "./ui/card";
import TrendHeader from "./TrendHeader";
import TrendChart from "./TrendChart";

interface TrendCardProps {
  data: any[];
  value: number | string;
  up: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  data,
  value,
  up,
}) => {
  const [selectedTrend, setSelectedTrend] = useState("Current");

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.leftSection}>
          <TrendHeader
            selectedTrend={selectedTrend}
            setSelectedTrend={setSelectedTrend}
          />
        </div>

        <div className={styles.rightSection}>
          <TrendChart
            selectedTrend={selectedTrend}
            data={data}
            value={value}
            up={up}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
