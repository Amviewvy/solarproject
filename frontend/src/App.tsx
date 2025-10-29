import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Lenis from "@studio-freight/lenis";
import styles from "./App.module.css";
import Sidebar from "./component/sidebar/sidebar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PartnerLogos from "./components/footer.tsx";
import ControlPLC from "./page/control_plc.tsx";
import ErrorPage from "./page/Error404.tsx";
import Dashboard from "./page/dashboard.tsx";
import LiveMeter from "./page/gateway.tsx";
import Log from "./page/log_all.tsx";
import LoginPage from "./page/Login.tsx";
import MoreMeters from "./page/more_meters.tsx";
import { socket } from "./socket.ts";
import MeterDetail from "./page/MeterDetail.tsx";
import OAuthCallbackPage from "./utils/OAuthCallbackPage.tsx";
import SecretPage from "./secret/page.tsx";

function App() {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    // //ตั้งค่า Lenis (smooth scroll)
    // const lenis = new Lenis({
    //   duration: 1.5,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   orientation: "vertical",
    //   gestureOrientation: "vertical",
    //   touchMultiplier: 2,
    //   infinite: false,
    // });

    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    // //cleanup เมื่อ component ถูกปิด
    // return () => {
    //   lenis.destroy();
    // };
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
            <Route path="/control-plc" element={<ControlPLC /> } />
            <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
            <Route path="/log" element={<Log />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gateway" element={<LiveMeter />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </div>
        <PartnerLogos />
      </div>
    </Router>
  );
}

export default App;
