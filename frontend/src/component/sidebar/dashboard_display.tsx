import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import DashboardPageMenu from "./dashboard_page_menu";
import styles from "./sidebar.module.css";

function DashboardDisplay() {
  const [selectedPage, setSelectedPage] = useState<string>("");

  const handleOnClick = (value: string) => {
    setSelectedPage(value);
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.element_wrapper}>
        <div className={styles.dashboard_wrap}>
          {/* Header */}
          <HomeIcon sx={{ fontSize: 20, color: "#FF6600" }} />
          <p className={styles.dashboard_header_text}>Dashboard</p>
        </div>

        <div className={styles.menu_wrap}>
          <DashboardPageMenu
            text="All pages"
            is_selected={selectedPage === "All pages"}
            handleOnClick={() => handleOnClick("All pages")}
          />
          <DashboardPageMenu
            text="More meters"
            is_selected={selectedPage === "More meters"}
            handleOnClick={() => handleOnClick("More meters")}
          />
          <DashboardPageMenu
            text="Control PLC and inverter"
            is_selected={selectedPage === "Control PLC and inverter"}
            handleOnClick={() => handleOnClick("Control PLC and inverter")}
          />
          <DashboardPageMenu
            text="Log"
            is_selected={selectedPage === "Log"}
            handleOnClick={() => handleOnClick("Log")}
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardDisplay;