import React from "react";
import Dashboard_main_1 from "../components/dashboard_main_1";
import Header from "../components/nev_bar";
import Dashboard_main_2 from "../components/dashboard_main_2";
import Dashboard_main_3 from "../components/dashboard_main_3";

const Dashboard: React.FC = () => {
  return (
  
        <div>
          <Header title="Main Dashboard"/>
          <Dashboard_main_1 />
          <Dashboard_main_2 />
          <Dashboard_main_3 />
        </div>

  );
};

export default Dashboard;
