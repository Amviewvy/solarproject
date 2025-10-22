import React from "react";
import styles from "../styles/usis3d.module.css";
import MeterCard from "./all_meter/MeterCard";

interface MeterData {
  voltage: number;
  current: number;
  power: number;
}

interface ButtonData {
  id: number;
  label: string;
  meterData: MeterData;
}

interface MeterPopupProps {
  selectedMeter: number | null;
  greenButtons: ButtonData[];
  orangeButton: ButtonData;
  onClose: () => void;
}

const MeterPopup: React.FC<MeterPopupProps> = ({
  selectedMeter,
  greenButtons,
  orangeButton,
  onClose
}) => {
  // ป้องกันการ scroll ของ body เมื่อ popup เปิด
  React.useEffect(() => {
    if (selectedMeter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMeter]);

  if (!selectedMeter) return null;

  const allButtons = [...greenButtons, orangeButton];
  const selectedButton = allButtons.find(btn => btn.id === selectedMeter);

  if (!selectedButton) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>
        <MeterCard
          meterId={selectedButton.id}
          voltage={selectedButton.meterData.voltage}
          current={selectedButton.meterData.current}
          power={selectedButton.meterData.power}
        />
      </div>
    </div>
  );
};

export default MeterPopup;