"use client";
import React, { useState } from "react";
import styles from "./MeterComparison.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import CompareGraphPopup from "./MeterCompareGraphPopup";

interface MeterComparisonHeaderProps {
  onCompare: (meters: string[], fields: string[], mode: 'meter' | 'data') => void;
}

const MeterComparisonHeader: React.FC<MeterComparisonHeaderProps> = ({
  onCompare,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className={styles.headerContainer}>
        {/* ปุ่ม Compare Graph */}
        <button
          className={styles.compareButton}
          onClick={() => setShowPopup(true)}
        >
          <span>Compare Graph</span>
        </button>

        {/* ปุ่ม Download */}
        <button className={styles.downloadButton}>
          <DownloadIcon className={styles.downloadIcon} />
        </button>
      </div>

      <CompareGraphPopup
  isOpen={showPopup}
  onClose={() => setShowPopup(false)}
  onCompare={(meters, fields, mode) => onCompare(meters, fields, mode)}
/>

    </>
  );
};

export default MeterComparisonHeader;
