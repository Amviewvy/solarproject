import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardPageMenu from "./dashboard_page_menu";
import styles from "./sidebar.module.css";

interface DashboardDisplayProps {
  onMenuSelect?: () => void;
}

function DashboardDisplay({ onMenuSelect }: DashboardDisplayProps) {
  const [selectedPage, setSelectedPage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ตรวจสอบ path ปัจจุบัน และ set เมนูที่เลือกตอนเปิดเว็บ
  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        setSelectedPage("Main Dashboard");
        break;
      case "/more-meters":
        setSelectedPage("More meters");
        break;
      case "/control-plc":
        setSelectedPage("Control PLC and inverter");
        break;
      case "/log":
        setSelectedPage("Log");
        break;
      default:
        setSelectedPage("");
    }
  }, [location.pathname]);

  const handleOnClick = (value: string, path: string) => {
    setSelectedPage(value);
    navigate(path);
    
    // Close mobile menu after selection
    if (window.innerWidth <= 480 && onMenuSelect) {
      onMenuSelect();
    }
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.element_wrapper}>
        {/* Header - Hidden on mobile */}
        <div className={styles.dashboard_wrap}>
          <HomeIcon sx={{ fontSize: 20, color: "#FF6600" }} />
          <p className={styles.dashboard_header_text}>Menu</p>
        </div>

        <div className={styles.menu_wrap}>
          <DashboardPageMenu
            text="Main Dashboard"
            is_selected={selectedPage === "Main Dashboard"}
            handleOnClick={() => handleOnClick("Main Dashboard", "/dashboard")}
            icon={<DashboardIcon sx={{ fontSize: 20, color: "#FF6600" }} />}
          />
          <DashboardPageMenu
            text="More meters"
            is_selected={selectedPage === "More meters"}
            handleOnClick={() => handleOnClick("More meters", "/more-meters")}
            icon={<SpeedIcon sx={{ fontSize: 20, color: "#FF6600" }} />}
          />
          <DashboardPageMenu
            text="Control PLC"
            is_selected={selectedPage === "Control PLC and inverter"}
            handleOnClick={() => handleOnClick("Control PLC and inverter", "/control-plc")}
            icon={<SettingsInputComponentIcon sx={{ fontSize: 20, color: "#FF6600" }} />}
          />
          <DashboardPageMenu
            text="Log"
            is_selected={selectedPage === "Log"}
            handleOnClick={() => handleOnClick("Log", "/log")}
            icon={<ListAltIcon sx={{ fontSize: 20, color: "#FF6600" }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardDisplay;