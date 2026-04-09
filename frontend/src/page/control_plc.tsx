import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/nev_bar';
import Plcinverter from '../components/PLC/plc_inverter_main_1';
import styles from '../styles/nev.module.css';

type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

const ControlPLC: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('access_token');

  // ✅ เช็ค role ตอนเข้า page
  useEffect(() => {
    if (!token) {
      navigate('/control-plc', { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.role !== 'admin') {
        // ❌ ไม่ใช่ admin → logout + redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const isLoggedIn = !!token;

  const requireLoginThen = (action: () => void) => {
    if (token) {
      action();
    } else {
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Header
        title="PLC and Inverter"
        rightElement={
          isLoggedIn ? (
            <button onClick={handleLogout} className={styles.userProfile}>
              <div className={styles.userProfileInner}>
                <p>USER LOCKOUT</p>
              </div>
            </button>
          ) : (
            <button onClick={handleLogin} className={styles.userProfile}>
              <div className={styles.userProfileInner}>
                <p>USER LOCKIN</p>
              </div>
            </button>
          )
        }
      />

      <Plcinverter requireLoginThen={requireLoginThen} />
    </div>
  );
};

export default ControlPLC;
