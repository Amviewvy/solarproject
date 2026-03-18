import React from 'react';
import styles from '../styles/usis3d.module.css';
import MeterCard from './all_meter/MeterCard';
import type { DeviceWithTrendData } from '../types/common';

interface ButtonData {
  id: number;
  location: string[];
  label: string;
  meterData: DeviceWithTrendData;
}

interface MeterPopupProps {
  selectedMeter: string | null;
  greenButtons: ButtonData[];
  orangeButton: ButtonData;
  onClose: () => void;
}

const MeterPopup: React.FC<MeterPopupProps> = ({
  selectedMeter,
  greenButtons,
  orangeButton,
  onClose,
}) => {
  // ป้องกันการ scroll ของ body เมื่อ popup เปิด
  React.useEffect(() => {
    if (!selectedMeter) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMeter]);

  if (!selectedMeter) return null;

  const allButtons = [...greenButtons, orangeButton];
  const selectedButton = allButtons.find((btn) => btn.location[0] === selectedMeter);

  if (!selectedButton) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close popup">
          ×
        </button>
        <MeterCard
          meterId={selectedButton.meterData.device_id}
          name={selectedButton.meterData.device_name}
          voltage={selectedButton.meterData.volts_ave}
          current={selectedButton.meterData.current_sum}
          power={selectedButton.meterData.power_sum}
        />
      </div>
    </div>
  );
};

export default MeterPopup;
