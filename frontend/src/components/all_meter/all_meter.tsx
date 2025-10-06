import React from "react";
import styles from "../../styles/all_meter.module.css";
import MeterCard from "./MeterCard";

const AllMeter: React.FC = () => {
  return (
    <div className={styles.parent}>
      <MeterCard meterId={1} voltage={220} current={10} power={2200} />
      <MeterCard meterId={2} voltage={230} current={12.5} power={2875} />
      <MeterCard meterId={3} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={4} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={5} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={6} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={7} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={8} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={9} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={10} voltage={218} current={9.8} power={2136} />
      <MeterCard meterId={11} voltage={218} current={9.8} power={2136} />
    </div>
  );
};

export default AllMeter;