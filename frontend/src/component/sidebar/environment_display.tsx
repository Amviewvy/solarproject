import { useMemo } from "react";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SensorsIcon from "@mui/icons-material/Sensors";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import EnvironmentCard from "./environment_card";
import styles from "./sidebar.module.css";

// กำหนดค่า threshold สำหรับแต่ละประเภท
const THRESHOLDS = {
  TEMP: { min: 15, max: 35 }, // °C
  HUMIDITY: { min: 30, max: 80 }, // %
  LIGHT: { min: 100, max: 1000 }, // W/m²
};

// ข้อมูล Environment (ในการใช้งานจริงอาจมาจาก props หรือ API)
const ENVIRONMENT_DATA = {
  temperature: 27,
  humidity: 90,
  light: 852,
};

function EnvironmentDisplay() {
  // ตรวจสอบว่าค่าไหนเกิน threshold
  const warnings = useMemo(() => {
    const warningList = [];

    // Check Temperature
    if (
      ENVIRONMENT_DATA.temperature < THRESHOLDS.TEMP.min ||
      ENVIRONMENT_DATA.temperature > THRESHOLDS.TEMP.max
    ) {
      warningList.push("TEMP");
    }

    // Check Humidity
    if (
      ENVIRONMENT_DATA.humidity < THRESHOLDS.HUMIDITY.min ||
      ENVIRONMENT_DATA.humidity > THRESHOLDS.HUMIDITY.max
    ) {
      warningList.push("HUMIDITY");
    }

    // Check Light
    if (
      ENVIRONMENT_DATA.light < THRESHOLDS.LIGHT.min ||
      ENVIRONMENT_DATA.light > THRESHOLDS.LIGHT.max
    ) {
      warningList.push("LIGHT");
    }

    return warningList;
  }, []);

  // นับจำนวนการแจ้งเตือน
  const warningCount = warnings.length;

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.element_wrapper}>
        <div>
          {/* Header */}
          <div className={styles.header_wrap}>
            <SensorsIcon sx={{ fontSize: 30, color: "#FF6600" }} />
            <p className={styles.header_text}>Environment</p>
            
            {/* Notification Badge - แสดงเฉพาะเมื่อมีการแจ้งเตือน */}
            {warningCount > 0 && (
              <div className={styles.notify_wrap}>
                <NotificationsActiveIcon sx={{ fontSize: 20, color: "#F5F5F5" }} />
                <p className={styles.notify_number}>{warningCount}</p>
              </div>
            )}
          </div>

          {/* Temperature Card */}
          <EnvironmentCard
            icon_src={
              <DeviceThermostatIcon sx={{ fontSize: 24, color: "#FF6600" }} />
            }
            alt_msg="temp icon"
            name="TEMP"
            value={ENVIRONMENT_DATA.temperature}
            unit="°C"
            width={18}
            was_warning={warnings.includes("TEMP")}
          />

          {/* Humidity Card */}
          <EnvironmentCard
            icon_src={<WaterDropIcon sx={{ fontSize: 24, color: "#FF6600" }} />}
            alt_msg="humidity icon"
            name="HUMIDITY"
            value={ENVIRONMENT_DATA.humidity}
            unit="%"
            width={20}
            was_warning={warnings.includes("HUMIDITY")}
          />

          {/* Light Card */}
          <EnvironmentCard
            icon_src={<WbSunnyIcon sx={{ fontSize: 24, color: "#FF6600" }} />}
            alt_msg="sun icon"
            name="LIGHT"
            value={ENVIRONMENT_DATA.light}
            unit=" W/m²"
            width={20}
            was_warning={warnings.includes("LIGHT")}
          />
        </div>
      </div>
    </div>
  );
}

export default EnvironmentDisplay;