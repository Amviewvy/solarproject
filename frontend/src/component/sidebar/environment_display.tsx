import { useEffect, useState } from "react";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SensorsIcon from "@mui/icons-material/Sensors";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import EnvironmentCard from "./environment_card";
import styles from "./sidebar.module.css";
import { socket } from "../../socket";

// กำหนดค่า threshold สำหรับแต่ละประเภท
const THRESHOLDS = {
  TEMP: { min: 15, max: 35 }, // °C
  HUMIDITY: { min: 30, max: 80 }, // %
  LIGHT: { min: 100, max: 1000 }, // W/m²
};

type EnvironmentData = {
  temperature: number;
  humidity: number;
  pyranometer: number;
};

function EnvironmentDisplay() {
  const [environmentData, setEnvironmentData] = useState<EnvironmentData>({
    temperature: 0,
    humidity: 0,
    pyranometer: 0,
  });
  const [connected, setConnected] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("environmentData", (data: EnvironmentData) => {
      console.log("Environment Data:", data);
      setEnvironmentData(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("environmentData");
    };
  }, []);

  useEffect(() => {
    console.log("Socket connected:", connected);
  }, [connected]);

  // ✅ คำนวณ warnings ทุกครั้งที่ environmentData เปลี่ยน
  useEffect(() => {
    const warningList: string[] = [];

    if (
      environmentData.temperature < THRESHOLDS.TEMP.min ||
      environmentData.temperature > THRESHOLDS.TEMP.max
    ) {
      warningList.push("TEMP");
    }

    if (
      environmentData.humidity < THRESHOLDS.HUMIDITY.min ||
      environmentData.humidity > THRESHOLDS.HUMIDITY.max
    ) {
      warningList.push("HUMIDITY");
    }

    if (
      environmentData.pyranometer < THRESHOLDS.LIGHT.min ||
      environmentData.pyranometer > THRESHOLDS.LIGHT.max
    ) {
      warningList.push("LIGHT");
    }

    setWarnings(warningList);
  }, [environmentData]);

  const warningCount = warnings.length;

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.element_wrapper}>
        <div>
          {/* Header */}
          <div className={styles.header_wrap}>
            <SensorsIcon sx={{ fontSize: 30, color: "#FF6600" }} />
            <p className={styles.header_text}>Environment</p>

            {/* Notification Badge */}
            {warningCount > 0 && (
              <div className={styles.notify_wrap}>
                <NotificationsActiveIcon sx={{ fontSize: 20, color: "#F5F5F5" }} />
                <p className={styles.notify_number}>{warningCount}</p>
              </div>
            )}
          </div>

          {/* Temperature Card */}
          <EnvironmentCard
            icon_src={<DeviceThermostatIcon sx={{ fontSize: 24, color: "#FF6600" }} />}
            alt_msg="temp icon"
            name="TEMP"
            value={environmentData.temperature}
            unit="°C"
            width={18}
            was_warning={warnings.includes("TEMP")}
          />

          {/* Humidity Card */}
          <EnvironmentCard
            icon_src={<WaterDropIcon sx={{ fontSize: 24, color: "#FF6600" }} />}
            alt_msg="humidity icon"
            name="HUMIDITY"
            value={environmentData.humidity}
            unit="%"
            width={20}
            was_warning={warnings.includes("HUMIDITY")}
          />

          {/* Light Card */}
          <EnvironmentCard
            icon_src={<WbSunnyIcon sx={{ fontSize: 24, color: "#FF6600" }} />}
            alt_msg="sun icon"
            name="LIGHT"
            value={environmentData.pyranometer}
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
