import React from 'react';
import styles from '../styles/usis3d.module.css';
import MeterCard from './all_meter/MeterCard';

interface MeterPopupProps {
  selectedMeters: string[];
  onClose: () => void;
  getMeterDataByLocation: (location: string) => {
    device_name: string;
    location?: string;
    device_id: string;
    volts_ave: number;
    current_sum: number;
    power_sum: number;
  };
}

const MultiMeterPopup: React.FC<MeterPopupProps> = ({
  selectedMeters,
  onClose,
  getMeterDataByLocation,
}) => {
  // ป้องกันการ scroll ของ body เมื่อ popup เปิด
  React.useEffect(() => {
    const hasSelectedMeters = Array.isArray(selectedMeters) && selectedMeters.length > 0;
    document.body.style.overflow = hasSelectedMeters ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMeters]);

  if (!selectedMeters || selectedMeters.length === 0) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.multiPopupContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.multiPopupContent}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close popup">
            ×
          </button>
          <div className={styles.multiMeterGrid}>
            {selectedMeters.map((location, index) => {
              if (!location) return <></>;
              const meterData = getMeterDataByLocation(location);
              return (
                <div key={`${meterData.device_id}-${index}`} className={styles.meterCardWrapper}>
                  <MeterCard
                    meterId={meterData.device_id}
                    name={meterData.device_name}
                    voltage={meterData.volts_ave}
                    current={meterData.current_sum}
                    power={meterData.power_sum}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiMeterPopup;
