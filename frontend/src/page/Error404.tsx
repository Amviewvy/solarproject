import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Error404.module.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.notfound}>
        <div className={styles["notfound-404"]}>
          <h3>Oops!</h3>
          <h1>
            <span>#</span>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>

        <h2>Sorry, the page you requested was not found</h2>
        <p className={styles.message}>
          Looks like you’re lost in space 🌌  
          Don’t worry — let’s get you back home!
        </p>

        <button
          className={styles.homeButton}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
