// src/components/MeterDetail_main_2.tsx
"use client";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./MeterDetail_main_2.module.css";
import LogTable, { type LogRow } from "../Log_compare/LogTable";
import TrendCard from "../TrendCard";
import PredictCard from "./PredictCard";

interface MeterDetail_main_2Props {
  dateRange: { from: Date | null; to: Date | null };
}

const MeterDetail_main_2: React.FC<MeterDetail_main_2Props> = ({ dateRange }) => {
  const [data, setData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  //const API_URL = "http://localhost:3000";
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 50;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/measurements/?meter_id=${id}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch meter data");
        const json = await res.json();
        setData(json.data);
        setTotalPages(Number(json.totalPages) || 1);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <TrendCard
          startDate={dateRange.from}
          endDate={dateRange.to}
          meterId={Number(id)}
          baseUrl="http://localhost:3000"
        />
      </div>
      <div className={styles.div2}>
        <PredictCard />
      </div>
      <div className={styles.div3}>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <LogTable 
          data={data}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
           />
        )}
      </div>
    </div>
  );
};

export default MeterDetail_main_2;