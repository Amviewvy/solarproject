import React,{useMemo} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/nev_bar";
import LogoutIcon from "@mui/icons-material/Logout";
import Plcinverter from "../components/PLC/plc_inverter_main_1";
import styles from "../styles/nev.module.css";

const ControlPLC: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ตรวจสอบ token ใน localStorage
  const isLoggedIn = !!localStorage.getItem("access_token");

  // ฟังก์ชันบังคับล็อกอินก่อน แล้วค่อยทำ action
  const requireLoginThen = (action: () => void) => {
    if (localStorage.getItem("access_token")) {
      action();
    } else {
      // ไปหน้า login และจำ path เดิมไว้ (เผื่อกลับมา)
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Header */}
      <Header 
        title="PLC and Inverter" 
        rightElement={
        isLoggedIn ? (
          <button
            onClick={handleLogout} className={styles.plcLogoutBtn}
          >
            <LogoutIcon />
          </button>
        ) : (
          <button
            onClick={handleLogin} className={styles.plcLoginBtn}>
            🔐 SYSTEM LOCKIN
          </button>
        )
      }
      />

      {/* เนื้อหาหลัก */}
        <Plcinverter requireLoginThen={requireLoginThen} />
    </div>
  );
};

export default ControlPLC;
