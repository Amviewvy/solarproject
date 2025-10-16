'use client';
import React, { useState } from 'react';
import styles from './MeterComparison.module.css';
import MeterComparisonHeader from './MeterComparisonHeader';
import MeterComparisonGraph from './MeterComparisonGraph';

const MeterComparisonChart: React.FC = () => {
  const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<'meter' | 'data'>('meter');

  const handleCompare = (meters: string[], fields: string[], mode: 'meter' | 'data') => {
    setSelectedMeters(meters);
    setSelectedFields(fields);
    setCompareMode(mode);
  };

  const renderGraphs = () => {
    if (compareMode === 'meter') {
      // โหมดเปรียบเทียบระหว่างมิเตอร์ (เดิม)
      return selectedFields.map((field) => (
        <MeterComparisonGraph
          key={field}
          field={field}
          selectedMeters={selectedMeters}
        />
      ));
    } else {
      // โหมดเปรียบเทียบระหว่างข้อมูล
      return selectedMeters.map((meter) => (
        <MeterComparisonGraph
          key={meter}
          field={meter}
          selectedMeters={selectedFields} // ใช้ fields แทน meters
        />
      ));
    }
  };

  return (
    <div className={styles.chartWrapper}>
      <MeterComparisonHeader onCompare={handleCompare} />

      {selectedFields.length > 0 || selectedMeters.length > 0 ? (
        <div className={styles.graphContainer}>{renderGraphs()}</div>
      ) : (
        <div className={styles.noDataMessage}>
          <p>Select comparison type, meters, and data fields to generate graphs.</p>
        </div>
      )}
    </div>
  );
};

export default MeterComparisonChart;
