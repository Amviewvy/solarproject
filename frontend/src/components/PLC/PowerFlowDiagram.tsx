import React, { useState } from "react";
import styles from "../../styles/PowerFlowDiagram.module.css";
import SwitchToggle from "./SwitchToggle";

const ThreeBoxes: React.FC = () => {
  // State สำหรับจัดการสถานะสวิตช์ทั้งหมด
  const [switches, setSwitches] = useState([
    { id: "switch-1", row: 1, col: 0, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
    { id: "switch-2", row: 1, col: 2, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
    { id: "switch-3", row: 1, col: 4, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
    { id: "switch-4", row: 1, col: 6, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
    { id: "switch-5", row: 3, col: 0, checked: false, delay: 3000, transform: "translate(-50%, -50%)" },
    { id: "switch-6", row: 3, col: 2, checked: false, delay: 3000, transform: "translate(-50%, -50%)" },
    { id: "switch-7", row: 3, col: 4, checked: false, delay: 3000, transform: "translate(-50%, -50%)" },
    { id: "switch-8", row: 4, col: 5, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
    { id: "switch-9", row: 4, col: 3, checked: false, delay: 3000, transform: "translate(-50%, 10%)" },
  ]);

  // ข้อมูลตำแหน่งและข้อความหนังสือ
  const [textLabels] = useState([
    { id: "text-1", row: 2, col: 0, text: "Workshop"},
    { id: "text-2", row: 2, col: 2, text: "Hybrid Solar Battery\n(Grid - side)"},
    { id: "text-3", row: 2, col: 4, text: "Coffee Shop"},
    { id: "text-4", row: 2, col: 6, text: "Hybrid Solar System\n(Grid - side)"},
    { id: "text-5", row: 4, col: 1, text: "Hybrid Solar Battery System\n(Load - side)"},
    { id: "text-6", row: 4, col: 6, text: "Grid-tied PV System"},
    { id: "text-7", row: 0, col: 3, text: "Incoming" },
  ]);

  const rows = [
    [styles.box1, styles.box2, styles.box3, styles.box4, styles.box5, styles.box6, styles.box6],
    [styles.box7, styles.box8, styles.box9, styles.box10, styles.box11, styles.box12, styles.box38],
    [styles.box19, styles.box20, styles.box21, styles.box22, styles.box23, styles.box24, styles.box40],
    [styles.box25, styles.box26, styles.box27, styles.box28, styles.box29, styles.box30, styles.box41],
    [styles.box31, styles.box32, styles.box33, styles.box34, styles.box35, styles.box36, styles.box37],
  ];

  const rowClasses = [styles.top, styles.up, styles.up1, styles.up2, styles.up3];

  const handleSwitchChange = (switchId: string, checked: boolean) => {
    setSwitches(prev => prev.map(switchItem =>
      switchItem.id === switchId 
        ? { ...switchItem, checked }
        : switchItem
    ));
    
    console.log(`Switch ${switchId} changed to: ${checked}`);
  };

  const getSwitchConfig = (rowIndex: number, boxIndex: number) => {
    return switches.find(switchItem => 
      switchItem.row === rowIndex && switchItem.col === boxIndex
    );
  };

  const getTextLabel = (rowIndex: number, boxIndex: number) => {
    return textLabels.find(textItem => 
      textItem.row === rowIndex && textItem.col === boxIndex
    );
  };

  return (
    <div className={styles.container}>
      {rows.map((rowBoxes, rowIndex) => (
        <div key={rowIndex} className={rowClasses[rowIndex]}>
          {rowBoxes.map((boxClass, boxIndex) => {
            const arrowClass = 
              (rowIndex === 4 && boxIndex === 2) || (rowIndex === 4 && boxIndex === 4) || (rowIndex === 2 && boxIndex === 6)
                ? styles.arrowDown2
              : (rowIndex === 3 && boxIndex === 1) || (rowIndex === 3 && boxIndex === 3) || (rowIndex === 3 && boxIndex === 5)
                ? styles.arrowDown
              : rowIndex === 0 && boxIndex === 3
                ? styles.arrowUp
              : "";

            const switchConfig = getSwitchConfig(rowIndex, boxIndex);
            const textLabel = getTextLabel(rowIndex, boxIndex);

            return (
              <div key={boxIndex} className={`${styles.box} ${boxClass} ${arrowClass}`}>
                {switchConfig && (
                  <div 
                    className={styles.switchContainer}
                    style={{ transform: switchConfig.transform }}
                  >
                    <SwitchToggle
                      checked={switchConfig.checked}
                      onChange={(checked) => handleSwitchChange(switchConfig.id, checked)}
                      delay={switchConfig.delay}
                    />
                  </div>
                )}
                
                {textLabel && (
                  <div 
                    className={styles.textLabel}>
                    {textLabel.text.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ThreeBoxes;