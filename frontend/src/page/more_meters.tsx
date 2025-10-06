import React from "react";
import Header from "../components/nev_bar";
import AllMeter from "../components/all_meter/all_meter";

const MoreMeters: React.FC = () => {
  return (
  
        <div>
          <Header title="More meter"/>
          <AllMeter /> 
        </div>

  );
};

export default MoreMeters;
