import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Lenis from "@studio-freight/lenis";
import styles from './App.module.css';
import Sidebar from './component/sidebar/sidebar.tsx';
import PartnerLogos from './components/footer.tsx';
import ControlPLC from './page/control_plc.tsx';
import ErrorPage from './page/Error404.tsx';
import Dashboard from './page/dashboard.tsx';
import LiveMeter from './page/gateway.tsx';
import Log from './page/log_all.tsx';
import LoginPage from './page/Login.tsx';
import MoreMeters from './page/more_meters.tsx';
import { socket } from './socket.ts';
import MeterDetail from './page/MeterDetail.tsx';
import OAuthCallbackPage from './utils/OAuthCallbackPage.tsx';
function App() {
  useEffect(() => {
    if (!socket.connected) socket.connect();
  }, []);

  return (
    <Router>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/more-meters" element={<MoreMeters />} />
            <Route path="/meter/:id" element={<MeterDetail />} />
            <Route path="/control-plc" element={<ControlPLC />} />
            <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
            <Route path="/log" element={<Log />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gateway" element={<LiveMeter />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <PartnerLogos />
      </div>
    </Router>
  );
}

export default App;
