import React from "react";
import styles from "../styles/nev.module.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {title}
      </h1>
    </header>
  );
};

export default Header;