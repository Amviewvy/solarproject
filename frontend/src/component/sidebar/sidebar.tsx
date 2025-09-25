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
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.search_wrap}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Search for..."
          />
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
