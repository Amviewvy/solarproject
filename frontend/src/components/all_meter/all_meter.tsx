import React from "react";
import AllMeterWithData from "./AllMeterWithData";

const AllMeter: React.FC = () => {
  // const targetMeterIds = [1, 3, 5, 7]; // เปลี่ยนเป็นไอดีที่คุณต้องการ
  const targetMeterIds: number[] | undefined = []; // จะแสดงทั้งหมด
  
  return <AllMeterWithData targetMeterIds={targetMeterIds} />;
};

export default AllMeter;