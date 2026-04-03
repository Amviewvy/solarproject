'use client';
import React, { useEffect, useState } from 'react';
import styles from './MeterComparison.module.css';
import MeterComparisonHeader from './MeterComparisonHeader';
import MeterComparisonGraph from './MeterComparisonGraph';

const API_URL = import.meta.env.VITE_API_URL;

type CompareMeterResponse = {
  field: string;
  series: { key: string; name: string }[];
  data: Array<Record<string, any>>;
};

type CompareFieldResponse = {
  deviceId: string;
  deviceName: string | null;
  series: { key: string; name: string; unit?: string | null }[];
  data: Array<Record<string, any>>;
};

interface MeterComparisonChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const MeterComparisonChart: React.FC<MeterComparisonChartProps> = ({ startDate, endDate }) => {
  const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<'meter' | 'data'>('meter');

  const [compareResults, setCompareResults] = useState<
    Array<CompareMeterResponse | CompareFieldResponse>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getStartOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getNextDay(date: Date) {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const handleCompare = async (meters: string[], fields: string[], mode: 'meter' | 'data') => {
    setSelectedMeters(meters);
    setSelectedFields(fields);
    setCompareMode(mode);

    await fetchCompareData(meters, fields, mode);
  };

  const fetchCompareData = async (meters: string[], fields: string[], mode: 'meter' | 'data') => {
    setLoading(true);
    setError(null);
    setCompareResults([]);

    try {
      const start = startDate ? getStartOfDay(startDate).toISOString() : '2026-03-26T00:00:00.000Z';
      const end = endDate ? getNextDay(endDate).toISOString() : '2026-03-27T00:00:00.000Z';
      const limit = 5000;

      if (mode === 'meter') {
        if (meters.length === 0 || fields.length === 0) {
          setCompareResults([]);
          return;
        }

        const requests = fields.map(async (field) => {
          const url =
            `${API_URL}/telemetry/compare/meters` +
            `?device_ids=${encodeURIComponent(meters.join(','))}` +
            `&field=${encodeURIComponent(field)}` +
            `&start=${encodeURIComponent(start)}` +
            `&end=${encodeURIComponent(end)}` +
            `&limit=${limit}`;

          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Failed to fetch compare meters for ${field}`);
          }

          return res.json();
        });

        const results = await Promise.all(requests);
        setCompareResults(results);
      } else {
        if (meters.length === 0 || fields.length === 0) {
          setCompareResults([]);
          return;
        }

        const requests = meters.map(async (meterId) => {
          const url =
            `${API_URL}/telemetry/compare/fields` +
            `?device_id=${encodeURIComponent(meterId)}` +
            `&fields=${encodeURIComponent(fields.join(','))}` +
            `&start=${encodeURIComponent(start)}` +
            `&end=${encodeURIComponent(end)}` +
            `&limit=${limit}`;

          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Failed to fetch compare fields for meter ${meterId}`);
          }

          return res.json();
        });

        const results = await Promise.all(requests);
        setCompareResults(results);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load comparison data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMeters.length === 0 || selectedFields.length === 0) {
      return;
    }

    fetchCompareData(selectedMeters, selectedFields, compareMode);
  }, [startDate, endDate]);

  return (
    <div className={styles.chartWrapper}>
      <MeterComparisonHeader onCompare={handleCompare} />

      {loading ? (
        <div className={styles.noDataMessage}>
          <p>Loading comparison data...</p>
        </div>
      ) : error ? (
        <div className={styles.noDataMessage}>
          <p>{error}</p>
        </div>
      ) : compareResults.length > 0 ? (
        <div className={styles.graphContainer}>
          {compareResults.map((result, index) => (
            <MeterComparisonGraph
              key={`${compareMode}-${index}`}
              compareData={result}
              mode={compareMode}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noDataMessage}>
          <p>Select comparison.</p>
        </div>
      )}
    </div>
  );
};

export default MeterComparisonChart;
