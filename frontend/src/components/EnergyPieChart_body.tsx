"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
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

  const chartData = [
    { type: "import", value: importValue, fill: "#8FD14F" },
    { type: "export", value: exportValue, fill: "#604CC3" },
    { type: "other", value: otherValue, fill: "#FF6600" },
  ];

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          Energy Import / Export
        </CardTitle>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <ChartContainer config={chartConfig} className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="70%"
                paddingAngle={1}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <ChartFooter importValue={importValue} exportValue={exportValue} />
    </Card>
  );
}
