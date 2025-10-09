import React from "react";

import USIS_3D from "../assets/usis_3D.png";
import styles from "../styles/usis3d.module.css";
import GreenGlowButton from "./usis_3d_btn_green";
import OrangeGlowButton from "./usis_3d_btn_orange";

const Usis3d: React.FC = () => {
  const greenButtons = [
    { id: 1, top: "40%", left: "30%", label: "A" },
    { id: 2, top: "45%", left: "50%", label: "B" },
    { id: 3, top: "30%", left: "60%", label: "C" },
  ];
  const orangeButton = {
    id: 4,
    top: "15%",
    left: "50%",
    label: "O",
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={USIS_3D}
          alt="Chart"
          draggable={false}
        />

        {/* วนลูปปุ่มสีเขียว */}
        {greenButtons.map((btn) => (
          <div
            key={btn.id}
            className={styles.buttonPosition}
            style={{ top: btn.top, left: btn.left }}>
            <GreenGlowButton
              onClick={() => alert(`Clicked ${btn.label}`)}
              size={40}
            />
          </div>
        ))}

        {/* ปุ่มสีส้ม */}
        <div
          className={styles.buttonPosition}
          style={{ top: orangeButton.top, left: orangeButton.left }}>
          <OrangeGlowButton
            onClick={() => alert(`Clicked ${orangeButton.label}`)}
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Usis3d;
