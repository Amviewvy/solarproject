import { CardFooter } from "./ui/card";
import styles from "../styles/EnergyPieChart.module.css";

interface ChartFooterProps {
  importValue: number;
  exportValue: number;
}

export default function ChartFooter({ importValue, exportValue }: ChartFooterProps) {
  return (
    <CardFooter className={styles.cardFooter}>
      <div className={styles.itemContainer}>
        <span className={styles.indicatorImport} />
        <div>
          <p className={styles.label}>Energy Import</p>
          <p className={styles.value}>{importValue}%</p>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.itemContainer}>
        <span className={styles.indicatorExport} />
        <div>
          <p className={styles.label}>Energy Export</p>
          <p className={styles.value}>{exportValue}%</p>
        </div>
      </div>
    </CardFooter>
  );
}