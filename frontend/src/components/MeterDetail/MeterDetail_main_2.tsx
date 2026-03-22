// src/components/MeterDetail_main_2.tsx
'use client';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './MeterDetail_main_2.module.css';
import LogTable, { type LogRow } from '../Log_compare/LogTable';
import TrendCard from '../TrendCard';
import { socket } from '../../socket';
// import PredictCard from './PredictCard';

const apiUrl: string = import.meta.env.VITE_API_URL;
interface MeterDetail_main_2Props {
  dateRange: { from: Date | null; to: Date | null };
}

const MeterDetail_main_2: React.FC<MeterDetail_main_2Props> = ({ dateRange }) => {
  const [data, setData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 50;

  useEffect(() => {
    async function fetchDataLog() {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiUrl}/measurements?meter_id=${id}&limit=${limit}&page=${page}`,
        );
        const rawJson = await res.json();
        const data = rawJson.data;
        setData(data);
        setTotalPages(Number(rawJson.totalPages) || 1);
      } catch (error: any) {
        setError(error.message);
        console.error('error meter detail main 2: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDataLog();

    const onMeasurementUpdated = () => {
      fetchDataLog();
    };

    socket.on('measurement.updated', onMeasurementUpdated);

    return () => {
      socket.off('measurement.updated', onMeasurementUpdated);
    };
  }, [id, page]);

  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <TrendCard
          startDate={dateRange.from}
          endDate={dateRange.to}
          meterId={id}
          baseUrl={apiUrl}
        />
      </div>
      <div className={styles.div2}>{/*<PredictCard />*/}</div>
      <div className={styles.div3}>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <LogTable data={data} page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default MeterDetail_main_2;
