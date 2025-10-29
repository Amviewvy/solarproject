import React, { useState, useEffect } from "react";
import styles from "../styles/TrendChart.module.css";
import { Card, CardContent } from "./ui/card";
import TrendHeader from "./TrendHeader";
import TrendChart from "./TrendChart";

interface TrendCardProps {
  startDate: Date | null;
  endDate: Date | null;
  meterId: number;
  baseUrl: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  startDate,
  endDate,
  meterId,
  baseUrl,
}) => {
  const [selectedTrend, setSelectedTrend] = useState("SUM");
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState<string | number>("--");
  const [up, setUp] = useState<string>("--");

  // 🔹 แปลงชื่อ field ตาม selectedTrend
  const getKeysByTrend = (trend: string) => {
    switch (trend) {
      case "SUM":
        return {
          purple: "watt_sum",
          green: "volts_avg",
          orange: "current_sum",
        };
      case "Volt":
        return { purple: "voltage_1", green: "voltage_2", orange: "voltage_3" };
      case "Current":
        return { purple: "current_1", green: "current_2", orange: "current_3" };
      case "VA":
        return { purple: "va_1", green: "va_2", orange: "va_3" };
      case "VAR":
        return { purple: "var_1", green: "var_2", orange: "var_3" };
      case "PF":
        return { purple: "pf_1", green: "pf_2", orange: "pf_3" };
      default:
        return {
          purple: "watt_sum",
          green: "volts_avg",
          orange: "current_sum",
        };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;

      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      const url = `${baseUrl}/measurements/?meter_id=${meterId}&start=${start}&end=${end}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("API Error");
        const result = await res.json();

        const keyMap = getKeysByTrend(selectedTrend);

        const formatted = result.data.map((item: any) => ({
          date: item.measurement_time,
          purple: parseFloat(item[keyMap.purple]),
          green: parseFloat(item[keyMap.green]),
          orange: parseFloat(item[keyMap.orange]),
        }));

        formatted.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setData(formatted);
        // 🔹 คำนวณค่า value ใหม่
        if (selectedTrend === "SUM") {
          setValue("--");
        } else if (formatted.length > 0) {
          const lastItem = formatted[formatted.length - 1];
          const avg = (lastItem.purple + lastItem.green + lastItem.orange) / 3;
          setValue(avg.toFixed(2)); // ปรับทศนิยมตามต้องการ
        } else {
          setValue("--");
        }
        setUp("+0.0%");
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedTrend]);

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
