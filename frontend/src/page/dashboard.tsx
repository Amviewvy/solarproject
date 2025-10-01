import React from "react";
import styles from "./dashboard.module.css";
import Sidebar from "../component/sidebar/sidebar";
import PartnerLogos from "../components/footer";
import Dashboard_main_1 from "../components/dashboard_main_1";
import Header from "../components/nev_bar";
import Dashboard_main_2 from "../components/dashboard_main_2";
import Dashboard_main_3 from "../components/dashboard_main_3";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <Sidebar />
        <div>
          <Header title="Main Dashboard"/>
          <Dashboard_main_1 />
          <Dashboard_main_2 />
          <Dashboard_main_3 />
        </div>
      </div>
      <PartnerLogos />
    </div>
  );
};

export default Dashboard;
