import "./../../index.css";

import logo from "./../../assets/exymc_logo.png";
import DashboardDisplay from "./dashboard_display";
import EnvironmentDisplay from "./environment_display";
import styles from "./sidebar.module.css";

function Sidebar() {
  return (
    <>
      <div className={styles.wrap}>
        <div>
          <img src={logo} alt="logo" className={styles.logo}/>
        </div>
        <div className={styles.search_wrap}>
        </div>

        <hr className={styles.line} />

        <EnvironmentDisplay />

        <hr className={styles.line} />

        <DashboardDisplay />
      </div>
    </>
  );
}
export default Sidebar;
