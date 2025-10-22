import React, { useState, useEffect } from "react";
import USIS_3D from "../assets/usis_3D.png";
import USIS_3D_ZOOM from "../assets/usis_energy.png";
import styles from "../styles/usis3d.module.css";
import GreenGlowButton from "./usis_3d_btn_green";
import OrangeGlowButton from "./usis_3d_btn_orange";
import MeterPopup from "./usis_MeterPopup";
import MultiMeterPopup from "./usis_MultiMeterPopup";
import { fetchMeterData } from "./all_meter/AllMeterWithData";
import { buttonConfigs } from "../types/usis_buttonConfig"; // นำเข้า config

interface MeterData {
  meter_id: number;
  volts_avg: number;
  current_sum: number;
  watt_sum: number;
}

const Usis3d: React.FC = () => {
  const [selectedMeter, setSelectedMeter] = useState<number | null>(null);
  const [selectedMultiMeters, setSelectedMultiMeters] = useState<
    number[] | null
  >(null);
  const [meterData, setMeterData] = useState<MeterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isZoomMode, setIsZoomMode] = useState<boolean>(false);

  useEffect(() => {
    const loadMeterData = async () => {
      try {
        setLoading(true);
        const data = await fetchMeterData();
        setMeterData(data);
      } catch (err) {
        console.error("Error fetching meter data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMeterData();
  }, []);

  // ฟังก์ชันสำหรับค้นหาข้อมูล meter จาก meter_id
  const getMeterDataById = (meterId: number) => {
    const meter = meterData.find((m) => m.meter_id === meterId);
    if (meter) {
      return {
        voltage: meter.volts_avg,
        current: meter.current_sum,
        power: meter.watt_sum,
      };
    }
    return { voltage: 0, current: 0, power: 0 };
  };

  // ฟังก์ชันเมื่อกดปุ่มส้ม
  const handleOrangeButtonClick = () => {
    setIsZoomMode(true);
  };

  // ฟังก์ชันกลับสู่โหมดปกติ
  const handleBackToNormal = () => {
    setIsZoomMode(false);
    setSelectedMeter(null);
    setSelectedMultiMeters(null);
  };

  const handleClosePopup = () => {
    setSelectedMeter(null);
    setSelectedMultiMeters(null);
  };

  const handleButtonClick = (button: any) => {
    if (button.type === "multi") {
      setSelectedMultiMeters(button.meterIds);
    } else {
      setSelectedMeter(button.id);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div>Loading meter data...</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {isZoomMode && (
          <div
            className={styles.backButton}
            style={{ top: "10%", left: "10%" }}
          >
            <button
              className={styles.backButtonStyle}
              onClick={handleBackToNormal}
            >
              ← Back
            </button>
          </div>
        )}
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={isZoomMode ? USIS_3D_ZOOM : USIS_3D}
            alt="Chart"
            draggable={false}
          />

          {/* แสดงปุ่มตามโหมด */}
          {!isZoomMode ? (
            /* โหมดปกติ */
            <>
              {/* วนลูปปุ่มสีเขียว */}
              {buttonConfigs.greenButtons.map((btn) => (
                <div
                  key={btn.id}
                  className={styles.buttonPosition}
                  style={{ top: btn.top, left: btn.left }}
                >
                  <GreenGlowButton
                    onClick={() => handleButtonClick(btn)}
                    size={40}
                  />
                </div>
              ))}

              {/* ปุ่มสีส้ม */}
              <div
                className={styles.buttonPosition}
                style={{
                  top: buttonConfigs.orangeButton.top,
                  left: buttonConfigs.orangeButton.left,
                }}
              >
                <OrangeGlowButton onClick={handleOrangeButtonClick} size={40} />
              </div>
            </>
          ) : (
            /* โหมดซูม */
            <>
              {/* วนลูปปุ่มใหม่ */}
              {buttonConfigs.zoomModeButtons.map((btn) => (
                <div
                  key={btn.id}
                  className={styles.buttonPosition}
                  style={{ top: btn.top, left: btn.left }}
                >
                  <GreenGlowButton
                    onClick={() => handleButtonClick(btn)}
                    size={40}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Popup สำหรับแสดงข้อมูล meter เดี่ยว */}
      <MeterPopup
        selectedMeter={selectedMeter}
        greenButtons={[
          ...buttonConfigs.greenButtons.map((btn) => ({
            ...btn,
            meterData: getMeterDataById(btn.id),
          })),
          ...buttonConfigs.zoomModeButtons.map((btn) => ({
            ...btn,
            meterData: getMeterDataById(btn.id),
          })),
        ]}
        orangeButton={{
          ...buttonConfigs.orangeButton,
          meterData: getMeterDataById(buttonConfigs.orangeButton.id),
        }}
        onClose={handleClosePopup}
      />

      {/* Popup สำหรับแสดงหลาย meter */}
      <MultiMeterPopup
        selectedMeterIds={selectedMultiMeters}
        onClose={handleClosePopup}
        getMeterDataById={getMeterDataById}
      />
    </>
  );
};

export default Usis3d;
