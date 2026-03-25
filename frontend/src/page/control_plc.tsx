import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/nev_bar';
import Plcinverter from '../components/PLC/plc_inverter_main_1';
import styles from '../styles/nev.module.css';

const ControlPLC: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ตรวจสอบ token ใน localStorage
  const isLoggedIn = !!localStorage.getItem('access_token');

  // ฟังก์ชันบังคับล็อกอินก่อน แล้วค่อยทำ action
  const requireLoginThen = (action: () => void) => {
    if (localStorage.getItem('access_token')) {
      action();
    } else {
      // ไปหน้า login และจำ path เดิมไว้ (เผื่อกลับมา)
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
      {/* Header */}
      <Header
        title="PLC and Inverter"
        rightElement={
          isLoggedIn ? (
            <button onClick={handleLogout} className={styles.userProfile}>
              <div className={styles.userProfileInner}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72H454.816c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z" />
                </svg>
                <p>USER LOCKOUT</p>
              </div>
            </button>
          ) : (
            <button onClick={handleLogin} className={styles.userProfile}>
              <div className={styles.userProfileInner}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
                </svg>
                <p>USER LOCKIN</p>
              </div>
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
