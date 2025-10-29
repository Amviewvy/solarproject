import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/nev_bar";
import LogoutIcon from "@mui/icons-material/Logout";
import PLCInverterControl from "../components/PLC/plc_inverter_main_1";

const ControlPLC: React.FC = () => {
  const navigate = useNavigate();

  // ตรวจสอบ token ใน localStorage
  const isLoggedIn = !!localStorage.getItem("access_token");

  // ฟังก์ชัน logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  // ฟังก์ชันไปหน้า login
  const handleLogin = () => {
    navigate("/login");
  };

  const requireLoginThen = (action: () => void) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // เก็บปลายทางไว้ เพื่อกลับมาหน้าเดิมหลังล็อกอิน
      localStorage.setItem("redirectTo", "/control-plc");
      navigate("/login", { replace: true });
      return;
    }
    action(); // มี token แล้ว ค่อยทำงานจริง
  };


  return (
    <div>
      {/* Header */}
      <Header title="PLC and Inverter" />

      {/* ปุ่ม Login / Logout */}
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "flex-end",
        //   padding: "16px 24px",
        // }}
      >
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              position: 'absolute',
              top: "10px",
              right: "10px",
              display: "flex",
              background: "linear-gradient(90deg, #f97316, #fb923c)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "0.3px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <LogoutIcon style={{ fontSize: 24 }} />
          </button>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              position: 'absolute',
              top: "1%",
              right: "0.1%",
              margin: "20px",
              display: "flex",
              background: "linear-gradient(90deg, #01579B, #0277BD)",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: "30px",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "0.3px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </button>
        )}
      </div>

      <PLCInverterControl requireLoginThen={requireLoginThen} />
      
    </div>
  );
};

export default ControlPLC;
