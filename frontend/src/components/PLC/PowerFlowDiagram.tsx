import React, { useState } from "react";
import styles from "../../styles/PowerFlowDiagram.module.css";
import SwitchToggle from "./SwitchToggle";

const PowerFlowDiagram: React.FC = () => {
  const [states, setStates] = useState({
    r22: false,
    r26: false,
    r27: false,
    r28: false,
    r23: false,
    r24: false,
    r25: false,
    r30: false,
    r29: false,
  });

  const handleToggle = (key: keyof typeof states) => (checked: boolean) => {
    setStates((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div data-layer="Frame 20" className={styles.frame20}>
      <div className={styles.frameInner}>
        {/* Main Grid Lines */}
        <div data-layer="|" className={styles.mainGrid}>
          <div className={styles.line11} />
          <div className={styles.line12} />
          <div className={styles.line13} />
          <div className={styles.line14} />
          <div className={styles.line20} />
          <div className={styles.line21} />
          <div className={styles.line22} />
          <div className={styles.line23} />
          <div className={styles.line18} />
          <div className={styles.line16} />
          <div className={styles.line24} />
        </div>

        {/* Outer Border Lines */}
        <div data-layer="---" className={styles.outerBorder}>
          <div className={styles.line1} />
          <div className={styles.line2} />
          <div className={styles.line3} />
          <div className={styles.line4} />
          <div className={styles.line5} />
          <div className={styles.line6} />
        </div>

        {/* ✅ SwitchToggle แทน Rectangles */}
        <div data-layer="o" className={styles.rectanglesContainer}>
          {/* Top 4 */}
          <div className={styles.rectangle22}>
            <SwitchToggle checked={states.r22} onChange={handleToggle("r22")} />
          </div>
          <div className={styles.rectangle26}>
            <SwitchToggle checked={states.r26} onChange={handleToggle("r26")} />
          </div>
          <div className={styles.rectangle27}>
            <SwitchToggle checked={states.r27} onChange={handleToggle("r27")} />
          </div>
          <div className={styles.rectangle28}>
            <SwitchToggle checked={states.r28} onChange={handleToggle("r28")} />
          </div>

          {/* Middle 3 */}
          <div className={styles.rectangle23}>
            <SwitchToggle checked={states.r23} onChange={handleToggle("r23")} />
          </div>
          <div className={styles.rectangle24}>
            <SwitchToggle checked={states.r24} onChange={handleToggle("r24")} />
          </div>
          <div className={styles.rectangle25}>
            <SwitchToggle checked={states.r25} onChange={handleToggle("r25")} />
          </div>

          {/* Bottom 2 */}
          <div className={styles.rectangle30}>
            <SwitchToggle checked={states.r30} onChange={handleToggle("r30")} />
          </div>
          <div className={styles.rectangle29}>
            <SwitchToggle checked={states.r29} onChange={handleToggle("r29")} />
          </div>
        </div>

        {/* Text Labels */}
        <div data-layer="text" className={styles.textContainer}>
          <div className={styles.word}>Workshop</div>
          <div className={`${styles.word} ${styles.hybridBattery}`}>
            Hybrid Solar Battery (Grid - side)
          </div>
          <div className={`${styles.word} ${styles.coffeeShop}`}>
            Coffee Shop
          </div>
          <div className={`${styles.word} ${styles.hybridSystem}`}>
            Hybrid Solar System (Grid - side)
          </div>
          <div className={`${styles.word} ${styles.hybridBatterySystem}`}>
            Hybrid Solar Battery System (Load - side)
          </div>
          <div className={`${styles.word} ${styles.gridTied}`}>
            Grid-tied PV System
          </div>
          <div className={`${styles.word} ${styles.incoming}`}>Incoming</div>
        </div>

        {/* Blue Triangles */}
        <div className={styles.trianglesContainer}>
          <div className={styles.triangleLeft} />
          <div className={styles.triangleRight} />
          <div className={styles.triangleMiddle1} />
          <div className={styles.triangleMiddle2} />
          <div className={styles.triangleHorizontal} />
          <div className={styles.triangleBottom1} />
          <div className={styles.triangleBottom2} />
        </div>
      </div>
    </div>
  );
};

export default PowerFlowDiagram;
