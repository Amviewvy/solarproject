import { CardFooter } from "./ui/card";
import styles from "../styles/EnergyPieChart.module.css";

interface ChartFooterProps {
  importValue: number;
  exportValue: number;
}

export default function ChartFooter({ importValue, exportValue }: ChartFooterProps) {
  return (
    <CardFooter className={styles.cardFooter}>
      <div className={styles.legendItem}>
        <span 
          className={styles.colorDot} 
          style={{ backgroundColor: "#8FD14F" }} 
        />
        <div>
          <p className={styles.legendLabel}>Energy Import</p>
          <p className={styles.legendValue}>{importValue}%</p>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.legendItem}>
        <span 
          className={styles.colorDot} 
          style={{ backgroundColor: "#604CC3" }} 
        />
        <div>
          <p className={styles.legendLabel}>Energy Export</p>
          <p className={styles.legendValue}>{exportValue}%</p>
        </div>
      </div>
    </CardFooter>
  );
}