"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "../styles/EnergyPieChart.module.css";
import ChartFooter from "./EnergyPieChart_footer";

interface EnergyPieChartProps {
  importValue: number;
  exportValue: number;
}

const COLORS = ["#8FD14F", "#604CC3", "#FF6600"]; // Import, Export, Other

export default function EnergyPieChart({ importValue, exportValue }: EnergyPieChartProps) {
  const total = 100;
  const otherValue = total - (importValue + exportValue);

  const data = [
    { name: "Import", value: importValue },
    { name: "Export", value: exportValue },
    { name: "Other", value: otherValue },
  ];

  return (
    <Card className={styles.card}>
      {/* Header */}
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          Energy Import / Export
        </CardTitle>
        <button className={styles.dropdownButton}>
          Monthly
          <ChevronDown size={16} />
        </button>
      </CardHeader>

      {/* Pie Chart Body */}
      <CardContent className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

      {/* Footer Component */}
      <ChartFooter importValue={importValue} exportValue={exportValue} />
    </Card>
  );
}