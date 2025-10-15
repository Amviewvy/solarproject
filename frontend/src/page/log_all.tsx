import React from "react";
import Header from "../components/nev_bar";
import Log_main_1 from "../components/Log_compare/Log_main_1";
import Log_main_2 from "../components/Log_compare/Log_main_2";

const Log: React.FC = () => {
  return (
  
        <div>
          <Header title="Control PLC and inverter"/>
          <Log_main_1 /> 
          <Log_main_2/>
        </div>

  );
};

export default Log;
