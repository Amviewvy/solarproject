"use client";
import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import type { ChartConfig } from "./ui/chart";
import styles from "../styles/MediumTraffic.module.css";

// Custom bar shape เพื่อให้ได้ gradient แบบเดิม
const CustomBar = (props: any) => {
  const { x, y, width, height } = props;
  const customWidth = 20; // px
  const customX = x + (width - customWidth) / 2; // จัดกลาง

  return (
    <g>
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="45%" stopColor="#8FD14F" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.28)" />
        </linearGradient>
      </defs>
      <rect
        x={customX}
        y={y}
        width={customWidth}
        height={height}
        fill="url(#barGradient)"
        rx={8} // border radius
      />
    </g>
  );
};

// กำหนด type สำหรับข้อมูล
interface TrafficData {
  time: string;
  value: number;
}

interface MediumTrafficProps {
  // รับ function สำหรับดึงข้อมูลจาก parent component
  fetchData?: () => Promise<TrafficData[]>;
  // หรือรับข้อมูลโดยตรง
  initialData?: TrafficData[];
}

const MediumTraffic: React.FC<MediumTrafficProps> = ({ 
  fetchData, 
  initialData 
}) => {
  const [chartData, setChartData] = useState<TrafficData[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  // เริ่มต้นเป็น Energy Export
  const [title, setTitle] = useState("Energy Consumption");
  const [currentLabel, setCurrentLabel] = useState("Energy Export");
  const [totalValue, setTotalValue] = useState("2.579");

  // ดึงข้อมูลเมื่อ component ถูกเรียกใช้
  useEffect(() => {
    const loadData = async () => {
      if (!fetchData) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchData();
        setChartData(data);
        
        // คำนวณ total value จากข้อมูลจริง
        const total = data.reduce((sum, item) => sum + item.value, 0);
        setTotalValue((total / 1000).toFixed(3)); // แปลงเป็น kWh
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching traffic data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  const handleSelectChange = (val: string) => {
    setTitle(val);
    // เปลี่ยน label ใน tooltip ตามที่เลือก
    if (val === "Energy Consumption") {
      setCurrentLabel("Energy Export");
    } else if (val === "Energy Input") {
      setCurrentLabel("Energy Import");
    } else {
      setCurrentLabel("Energy Usage");
    }
  };

  // Dynamic chart config ที่เปลี่ยนตาม Select
  const chartConfig = {
    value: {
      label: currentLabel,
    },
    energy: {
      label: currentLabel,
      color: "#8FD14F",
    },
  } satisfies ChartConfig;

  // แสดง loading state
  if (isLoading) {
    return (
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.loading}>Loading data...</div>
        </CardContent>
      </Card>
    );
  }

  // แสดง error state
  if (error) {
    return (
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.error}>{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.title}>{title}</p>
            <div className={styles.valueContainer}>
              <h2 className={styles.value}>{totalValue}</h2>
              <span className={styles.unit}>kWh</span>
            </div>
          </div>
          <Select onValueChange={handleSelectChange} value={title}>
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
        <div className={styles.chartContainer}>
          <ChartContainer config={chartConfig} className={styles.chart}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid vertical={false} className={styles.cartesianGrid} />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: '#787878', fontSize: 12, fontWeight: 'bold' }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" shape={<CustomBar />} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediumTraffic;