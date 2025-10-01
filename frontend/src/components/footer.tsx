import React from "react";
import logosbeneficaireserasmusright from "../assets/logosbeneficaireserasmusright_en.jpg";
import NU_USIS_Logo from "../assets/NU_USIS_Logo.jpg";
import NULOGO_Download_EN from "../assets/NULOGO-Download-EN.png";
import MESfiA_Logo from "../assets/MESfiA_Logo.png";
import NULOGO_Download_EN_30th from "../assets/NULOGO-Download-EN_30th.png";  

const PartnerLogos: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 bg-white p-2 w-full">
  <img
    src={logosbeneficaireserasmusright}
    alt="Erasmus Right Logo"
    className="h-12 w-auto"
    draggable={false}
  />
  <img
    src={NU_USIS_Logo}
    alt="NU USIS Logo"
    className="h-12 w-auto"
    draggable={false}
  />
  <img
    src={NULOGO_Download_EN}
    alt="NU Logo EN"
    className="h-12 w-auto"
    draggable={false}
  />
  <img
    src={MESfiA_Logo}
    alt="MESfiA Logo"
    className="h-12 w-auto"
    draggable={false}
  />
  <img
    src={NULOGO_Download_EN_30th}
    alt="NU 30th Logo"
    className="h-12 w-auto"
    draggable={false}
  />
</div>

  );
};

export default PartnerLogos;
