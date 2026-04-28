import React from 'react';
import logosbeneficaireserasmusright from '../assets/logosbeneficaireserasmusright_en.jpg';
import NU_USIS_Logo from '../assets/NU_USIS_Logo.jpg';
import NULOGO_Download_EN from '../assets/NULOGO-Download-EN.png';
import MESfiA_Logo from '../assets/MESfiA_Logo.png';
import NULOGO_Download_EN_30th from '../assets/NULOGO-Download-EN_30th.png';
import styles from '../styles/PartnerLogos.module.css';

const PartnerLogos: React.FC = () => {
  const logos = [
    { src: NU_USIS_Logo, alt: 'NU USIS Logo' },
    { src: NULOGO_Download_EN, alt: 'NU Logo EN' },
    { src: MESfiA_Logo, alt: 'MESfiA Logo' },
    { src: NULOGO_Download_EN_30th, alt: 'NU 30th Logo' },
    { src: logosbeneficaireserasmusright, alt: 'Erasmus Right Logo' },
  ];

  return (
    <footer className={styles.footer}>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          draggable={false}
          className={styles.logo}
        />
      ))}
    </footer>
  );
};

export default PartnerLogos;