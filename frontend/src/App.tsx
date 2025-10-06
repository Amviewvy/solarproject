import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/dashboard.tsx";
import MoreMeters from "./page/more_meters.tsx";
import ControlPLC from "./page/control_plc.tsx";
import Log from "./page/log_all.tsx";
import PartnerLogos from "./components/footer.tsx";
import styles from "./App.module.css";
import Sidebar from "./component/sidebar/sidebar.tsx";

function App() {
  return (
    <Router>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/more-meters" element={<MoreMeters />} />
            <Route path="/control-plc" element={<ControlPLC />} />
            <Route path="/log" element={<Log />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
        <PartnerLogos />
      </div>
    </Router>
  );
}

export default App;
