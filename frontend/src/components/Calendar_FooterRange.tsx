'use client';

import * as React from 'react';
import styles from '../styles/calender.module.css';

interface FooterRangeProps {
  range: { from: Date | null; to: Date | null };
}

const FooterRange: React.FC<FooterRangeProps> = ({ range }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.rangeBox}>
        <div>
          <span className={styles.label}>Start : </span>
          <span className={styles.dateText}>
            {range.from?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z" />
          </svg>
        </div>
        <div>
          <span className={styles.label}>End : </span>
          <span className={styles.dateText}>
            {range.to?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterRange;
