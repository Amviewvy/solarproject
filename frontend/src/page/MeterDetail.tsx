import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./../styles/MeterDetail.module.css";
import Header from "../components/nev_bar";
import MeterDetailContainer from "../components/MeterDetail/MeterDetailContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MeterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className={styles.detailContainer}>
      <Header title={`Meter ID: ${id}`} />
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fontSize: 16 }} />
      </button>
      <MeterDetailContainer />
    </div>
  );
};

export default MeterDetail;
