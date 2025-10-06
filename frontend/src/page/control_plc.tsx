import React from "react";
import Header from "../components/nev_bar";
import Plcinverter  from "../components/PLC/plc_inverter_main_1";

const ControlPLC: React.FC = () => {
  return (
  
        <div>
          <Header title="Control PLC and inverter"/>
          <Plcinverter /> 
        </div>

  );
};

export default ControlPLC;
