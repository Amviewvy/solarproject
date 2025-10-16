import { useState } from "react";
import styles from './styles.module.css';
import styles_btn from "./../components/Log_compare/MeterComparison.module.css";

export default function SecretPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const url = `${apiUrl}/measurements/export-stream`;
  
      const res = await fetch(url, {
        method: "GET",
      })
  
      if (!res.ok) {
        throw new Error(`Download failed: ${res.status}`);
      }
  
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "measurements.csv";
      link.click();
    } catch (err) {
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={ styles.button_wrap}>
      <button onClick={handleDownload} disabled={loading} className={styles_btn.compareButton}>
        {loading ? "⏳ Downloading..." : "Download CSV"}
      </button>
    </div>
  )
}