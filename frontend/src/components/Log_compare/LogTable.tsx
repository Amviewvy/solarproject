import React from "react";
import styles from "../../styles/LogTable.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";

export interface LogRow {
  building: string;
  block: string;
  DateTime: string;
  Volt_1: number;
  Volt_2: number;
  Volt_3: number;
  Current_1: number;
  Current_2: number;
  Current_3: number;
  Power_1: number;
  Power_2: number;
  Power_3: number;
  VA_1: number;
  VA_2: number;
  VA_3: number;
  VAR_1: number;
  VAR_2: number;
  VAR_3: number;
  PF_1: number;
  PF_2: number;
  PF_3: number;
  Frequency: number;
  Energy_Im: number;
  Energy_Ex: number;
  PowerSum: number;
  PowerAve: number;
  VA_SUM: number;
  VA_AVE: number;
}

interface LogTableProps {
  data: LogRow[];
}

const LogTable: React.FC<LogTableProps> = ({ data }) => {
  // ฟังก์ชันดาวน์โหลด CSV
  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), // header
      ...data.map((row) =>
        headers.map((field) => (row as any)[field]).join(",")
      ),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "log_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Log</div>
        <IconButton
          onClick={downloadCSV}
          sx={{
            backgroundColor: "#FF6600",
            width: 36,
            height: 36,
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#e65a00" },
          }}
        >
          <DownloadIcon sx={{ color: "#fff", width: 20, height: 20 }} />
        </IconButton>
      </div>

      <div className={styles.tableContainer}>
        {data.length > 0 ? (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>No data available</p>
        )}
      </div>
    </div>
  );
};

export default LogTable;
