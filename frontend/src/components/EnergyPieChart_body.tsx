"use client";

import { ChevronDown } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import type { ChartConfig } from "./ui/chart";
import ChartFooter from "./EnergyPieChart_footer";
import styles from "../styles/EnergyPieChart.module.css";

interface EnergyPieChartProps {
  importValue: number;
  exportValue: number;
}

// กำหนด chartConfig แบบเดียวกับโค้ดฟังก์ชั่น
const chartConfig = {
  value: {
    label: "Value",
  },
  import: {
    label: "Energy Import",
    color: "#8FD14F",
  },
  export: {
    label: "Energy Export",
    color: "#604CC3",
  },
  other: {
    label: "Other",
    color: "#FF6600",
  },
} satisfies ChartConfig;

export default function EnergyPieChart({ importValue, exportValue }: EnergyPieChartProps) {
  const total = 100;
  const otherValue = total - (importValue + exportValue);

  // ใช้ data structure แบบเดียวกับโค้ดฟังก์ชั่น
  const chartData = [
    { type: "import", value: importValue, fill: "#8FD14F" },
    { type: "export", value: exportValue, fill: "#604CC3" },
    { type: "other", value: otherValue, fill: "#FF6600" },
  ];

  return (
    <Card className={styles.card}>
      {/* Header - ปรับให้เหมือนโค้ดฟังก์ชั่น */}
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          Energy Import / Export
        </CardTitle>
        <button className={styles.dropdownButton}>
          Monthly
          <ChevronDown size={16} />
        </button>
      </CardHeader>

      {/* Pie Chart - ใช้โครงสร้างเหมือนโค้ดฟังก์ชั่น */}
      <CardContent className={styles.cardContent}>
        <ChartContainer
          config={chartConfig}
          className={styles.chartContainer}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={70}
              paddingAngle={0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Footer Component */}
      <ChartFooter importValue={importValue} exportValue={exportValue} />
    </Card>
  );
}