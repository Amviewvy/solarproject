import React from "react";
import styles from "../styles/usis3d.module.css";
import USIS_3D from "../assets/usis_3D.png";

const usis3d: React.FC = () =>  {     
    return (
        <div className={styles.container}>
      <img
        className={styles.image}
        src={USIS_3D}
        alt="Chart"
      />
    </div>
    );  
}
export default usis3d;