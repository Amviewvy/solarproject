"use client";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./MeterDetail_main_2.module.css";
import LogTable, { type LogRow } from "../Log_compare/LogTable";
import TrendCard from "../TrendCard";
import PredictCard from "./PredictCard";
import DateRangePicker from "../Calendar_DateRangePicker";

const MeterDetail_main_2: React.FC = () => {
  const [data, setData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:3000/measurements/?meter_id=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch meter data");
        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <DateRangePicker onRangeChange={setRange} />
      </div>
      <div className={styles.div2}>
        <TrendCard
          startDate={range.from}
          endDate={range.to}
          meterId={Number(id)}
          baseUrl="http://localhost:3000"
        />
      </div>
      <div className={styles.div3}>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <LogTable data={data} />
        )}
      </div>
    </div>
  );
};

export default MeterDetail_main_2;
