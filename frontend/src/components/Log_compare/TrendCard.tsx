import React, { useState } from "react";
import styles from "./TrendChart.module.css";
import { Card, CardContent } from "./../ui/card";
import TrendHeader from "./TrendHeader";
import TrendChart from "./TrendChart";

interface TrendCardProps {
  startDate?: Date | null;
  endDate?: Date | null;
  meterId?: number;
  baseUrl?: string;
}


const TrendCard: React.FC<TrendCardProps> = ({ 
  startDate, 
  endDate, 
  //meterId, 
  baseUrl } ) => {

    

  const [selectedMeter, setSelectedMeter] = useState("Meter_1");

  const meterId = Number(selectedMeter.split("_")[1]);  

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
            startDate={startDate}
            endDate={endDate}
            meterId={Number(selectedMeter.split("_")[1])}
            baseUrl={baseUrl}
          />
        </div>
          
      </CardContent>
    </Card>
  );
};

export default TrendCard;