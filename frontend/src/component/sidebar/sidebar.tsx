import "./../../index.css";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "./../../assets/exymc_logo.png";
import DashboardDisplay from "./dashboard_display";
import EnvironmentDisplay from "./environment_display";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  // ป้องกันการ scroll ของ body เมื่อ menu เปิด
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add('mobile_menu_open');
    } else {
      document.body.classList.remove('mobile_menu_open');
    }

    return () => {
      document.body.classList.remove('mobile_menu_open');
    };
  }, [isMobileOpen]);

  // ปิด menu เมื่อคลิก outside บน mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(`.${styles.wrap}`);
      const toggleButton = document.querySelector(`.${styles.mobile_menu_toggle}`);
      
      if (isMobileOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          toggleButton && 
          !toggleButton.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        className={styles.mobile_menu_toggle}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Backdrop */}
      <div 
        className={`${styles.mobile_menu_backdrop} ${isMobileOpen ? styles.mobile_open : ''}`}
        onClick={closeMobileMenu}
      />

      <div className={`${styles.wrap} ${isMobileOpen ? styles.mobile_open : ''}`}>
        <div>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.search_wrap}></div>
        <hr className={styles.line} />
        <EnvironmentDisplay />
        <hr className={styles.line} />
        <DashboardDisplay onMenuSelect={closeMobileMenu} />
        <hr className={styles.line} />
      </div>
    </>
  );
}