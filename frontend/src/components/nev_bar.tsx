import React from "react";
import styles from "../styles/nev.module.css";

interface HeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title,rightElement }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <div className={styles.rightElement}>
        {rightElement}
      </div>
    </header>
  );
};

export default Header;