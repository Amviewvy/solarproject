"use client";

import * as React from "react";
import styles from "../styles/calender.module.css";

interface FooterRangeProps {
  range: { from: Date | null; to: Date | null };
}

const FooterRange: React.FC<FooterRangeProps> = ({ range }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.rangeBox}>
        <div>
          <span className={styles.label}>Start Date : </span>
          <span className={styles.dateText}>
            {range.from?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className={styles.arrow}>→</div>
        <div>
          <span className={styles.label}>End Date : </span>
          <span className={styles.dateText}>
            {range.to?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterRange;
