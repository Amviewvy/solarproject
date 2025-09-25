import humidity_icon from "./../../assets/humidity_icon.svg";
import temp_icon from "./../../assets/icon_temp.svg";
import env_logo from "./../../assets/icon-environment.svg";
import notify_icon from "./../../assets/notify_icon.svg";
import sun_icon from "./../../assets/sun_icon.svg";
import EnvironmentCard from "./environment_card";
import styles from "./sidebar.module.css";

function EnvironmentDisplay() {
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.element_wrapper}>
        <div>
          {/* Header */}
          <div className={styles.header_wrap}>
            {/* Header */}
            <img src={env_logo} alt="environment logo" width={24} height={30} />
            <p className={styles.header_text}>Environment</p>
            <div className={styles.notify_wrap}>
              <img src={notify_icon} alt="notify icon" width={18} />
              <p className={styles.notify_number}>1</p>
            </div>
          </div>

          <EnvironmentCard
            icon_src={temp_icon}
            alt_msg="temp icon"
            name="TEMP"
            value={27}
            unit="°C"
            width={18}
            was_warning={false}
          />
          <EnvironmentCard
            icon_src={humidity_icon}
            alt_msg="humidity icon"
            name="HUMIDITY"
            value={90}
            unit="%"
            width={20}
            was_warning={false}
          />
          <EnvironmentCard
            icon_src={sun_icon}
            alt_msg="sun icon"
            name="LIGHT"
            value={852}
            unit=" W/m²"
            width={20}
            was_warning={true}
          />
        </div>
      </div>
    </div>
  );
}

export default EnvironmentDisplay;
