import React from "react";
import logosbeneficaireserasmusright from "../assets/logosbeneficaireserasmusright_en.jpg";
import NU_USIS_Logo from "../assets/NU_USIS_Logo.jpg";
import NULOGO_Download_EN from "../assets/NULOGO-Download-EN.png";
import MESfiA_Logo from "../assets/MESfiA_Logo.png";
import NULOGO_Download_EN_30th from "../assets/NULOGO-Download-EN_30th.png";

const PartnerLogos: React.FC = () => {
  const logos = [
    { src: NU_USIS_Logo, alt: "NU USIS Logo" },
    { src: NULOGO_Download_EN, alt: "NU Logo EN" },
    { src: MESfiA_Logo, alt: "MESfiA Logo" },
    { src: NULOGO_Download_EN_30th, alt: "NU 30th Logo" },
    { src: logosbeneficaireserasmusright, alt: "Erasmus Right Logo" }
  ];

  return (
      <footer className="w-full relative left-1/2 right-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center gap-2 sm:gap-6 bg-white py-4 px-3 border-t border-gray-200 shadow-sm">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          draggable={false}
          className="h-6 sm:h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
        />
      ))}
    </footer>
  );
};

export default PartnerLogos;
