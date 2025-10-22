import React from "react";
import styles from "../styles/usis3d.module.css";
import MeterCard from "./all_meter/MeterCard";

interface MeterPopupProps {
  selectedMeterIds: number[] | null;
  onClose: () => void;
  getMeterDataById: (meterId: number) => {
    voltage: number;
    current: number;
    power: number;
  };
}

const MultiMeterPopup: React.FC<MeterPopupProps> = ({
  selectedMeterIds,
  onClose,
  getMeterDataById
}) => {
  // ป้องกันการ scroll ของ body เมื่อ popup เปิด
  React.useEffect(() => {
    if (selectedMeterIds) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMeterIds]);

  if (!selectedMeterIds || selectedMeterIds.length === 0) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.multiPopupContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.multiPopupContent}>
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Close popup"
            >
              ×
            </button>
            <div className={styles.multiMeterGrid}>
              {selectedMeterIds.map((meterId) => {
                const meterData = getMeterDataById(meterId);
                return (
                  <div key={meterId} className={styles.meterCardWrapper}>
                    <MeterCard
                      meterId={meterId}
                      voltage={meterData.voltage}
                      current={meterData.current}
                      power={meterData.power}
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