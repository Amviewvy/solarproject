import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './../styles/MeterDetail.module.css';
import Header from '../components/nev_bar';
import MeterDetailContainer from '../components/MeterDetail/MeterDetailContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { type Device } from '../types/common';

const API_URL = import.meta.env.VITE_API_URL;

const MeterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meterDetail, setMeterDetail] = useState<Device | null>(null);

  useEffect(() => {
    if (!id) {
      setMeterDetail(null);
      return;
    }
    fetchDevice();
  }, [id]);

  async function fetchDevice() {
    try {
      const response = await fetch(`${API_URL}/devices/trend-latest?device_ids=${id}`);
      const rawJson = await response.json();
      const data = await rawJson.data[0];
      setMeterDetail({
        name: data.device_name,
        id: data.device_id,
        location: data.location,
      });
    } catch (error) {}
  }

  const navigate = useNavigate();

  return (
    <div className={styles.detailContainer}>
      <Header title={`${meterDetail?.name} - ${meterDetail?.location}`} />
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fontSize: 20 }} /> Back
      </button>
      <MeterDetailContainer />
    </div>
  );
};

export default MeterDetail;
