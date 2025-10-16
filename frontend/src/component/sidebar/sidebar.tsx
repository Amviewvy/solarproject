import "./../../index.css";

import logo from "./../../assets/exymc_logo.png";
import DashboardDisplay from "./dashboard_display";
import EnvironmentDisplay from "./environment_display";
import styles from "./sidebar.module.css";
// import { useLocation } from "react-router-dom";

export default function Sidebar() {
  // const { pathname } = useLocation();

  // // ให้ Main Dashboard active ได้ทั้ง "/" และ "/dashboard"
  // const isMainActive =
  //   pathname === "/" || pathname.startsWith("/dashboard");

  // // ✅ ประกาศคลาสพื้นฐาน/สถานะให้เรียกใช้ได้
  // const base =
  //   "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors";
  // const active =
  //   "bg-orange-50 text-orange-600 font-semibold border-l-4 border-orange-400";
  // const idle = "text-gray-600 hover:text-gray-900";


  return (
    <>
      <div className={styles.wrap}>
        <div>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.search_wrap}></div>

        <hr className={styles.line} />

        <EnvironmentDisplay />

        <hr className={styles.line} />

        <DashboardDisplay />

        <hr className={styles.line} />

        

        <hr className={styles.line} />
      </div>
    </>
  );
}

