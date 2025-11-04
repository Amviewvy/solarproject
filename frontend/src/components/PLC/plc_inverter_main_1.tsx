import React from "react";
import styles from "../../styles/plc_inverter_main_1.module.css";
import PowerFlowDiagram from "./PowerFlowDiagram";
import LogBox from "./plc_inverter_log";
import InverterControl from "./InverterControl";


type Props = {
  requireLoginThen: (action: () => void) => void;
};


const GridLayout: React.FC<Props> = ({requireLoginThen}) => {
  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <PowerFlowDiagram />
      </div>
      <div className={styles.div2}>
        <InverterControl requireLoginThen={requireLoginThen} />  
      </div>
      <div className={styles.div3}><LogBox/></div>
    </div>
  );
};

export default GridLayout;
