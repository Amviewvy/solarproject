import styles from "../styles/dashboard_main_1.module.css";
import SmallEarnings from "./total_average";
import Usis3d from "./usis_3d";
import MediumTraffic from "./energy_use";

const Dashboard_main_1: React.FC = () => {
  const data = [
    {
      icon: "V",
      label: "Average Voltage (Volt)",
      value: 227.957,
      iconColor: "iconGreen",
    },
    {
      icon: "A",
      label: "Average Current (Amp)",
      value: 5.23,
      iconColor: "iconRed",
    },
    {
      icon: "W",
      label: "Average Power (Watt)",
      value: 1200,
      iconColor: "iconBlue",
    },
  ];
  return (
    <div className={styles.parent}>
      <div
        className={styles.div1}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "nowrap" }}>
        {data.map((item, index) => (
          <SmallEarnings
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            iconColor={item.iconColor as "iconGreen" | "iconRed" | "iconBlue"}
          />
        ))}
      </div>
      <div className={styles.div4}>
        <MediumTraffic />
      </div>
      <div className={styles.div5}>
        <Usis3d />
      </div>
    </div>
  );
};

export default Dashboard_main_1;
