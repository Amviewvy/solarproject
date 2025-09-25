import React from "react";
import logosbeneficaireserasmusright from "../assets/logosbeneficaireserasmusright_en.jpg";
import NU_USIS_Logo from "../assets/NU_USIS_Logo.jpg";
import NULOGO_Download_EN from "../assets/NULOGO-Download-EN.png";
import MESfiA_Logo from "../assets/MESfiA_Logo.png";
import NULOGO_Download_EN_30th from "../assets/NULOGO-Download-EN_30th.png";  

const PartnerLogos: React.FC = () => {
  return (
    <div
      className="flex flex-wrap justify-center items-center gap-4 bg-white p-4 w-full"
    >
      <img
        src={logosbeneficaireserasmusright}
        alt="Erasmus Right Logo"
        className="w-32 sm:w-40 md:w-52 lg:w-64 h-auto"
        draggable={false}
      />
      <img
        src={NU_USIS_Logo}
        alt="NU USIS Logo"
        className="w-24 sm:w-32 md:w-40 h-auto"
        draggable={false}
      />
      <img
        src={NULOGO_Download_EN}
        alt="NU Logo EN"
        className="w-16 sm:w-20 md:w-24 h-auto"
        draggable={false}
      />
      <img
        src={MESfiA_Logo}
        alt="MESfiA Logo"
        className="w-24 sm:w-28 md:w-36 h-auto"
        draggable={false}
      />
      <img
        src={NULOGO_Download_EN_30th}
        alt="NU 30th Logo"
        className="w-20 sm:w-24 md:w-28 h-auto"
        draggable={false}
      />
    </div>
  );
};

export default PartnerLogos;
