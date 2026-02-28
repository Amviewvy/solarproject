import React, { useEffect, useState } from "react";
import styles from "../../styles/Log_main_2.module.css";
import MeterComparisonChart from "./MeterComparisonChart";
import LogTable, { type LogRow } from "./LogTable";

const API_URL = "http://localhost:3000";

const Log_main_2: React.FC = () => {
  const [data, setData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/measurements?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch meter data");
        const json = await res.json();
        setData(json.data);
        setTotalPages(json.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);


  return (
    <div className={styles.parent}>
            <div className={styles.div3}>
              {loading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <>
                <LogTable data={data}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                />

                 
                </>
              )}
            </div>

          <div className={styles.div3}>
            <MeterComparisonChart/>
          </div>
    </div>
  );
};

export default Log_main_2;
