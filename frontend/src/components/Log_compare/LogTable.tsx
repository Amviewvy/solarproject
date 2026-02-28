import React from "react";
import styles from "../../styles/LogTable.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";

export interface LogRow {
  id: number;
  meter?: { id: number; name: string };
  measurement_time: string;
  volts_avg: number;
  current_sum: number;
  watt_sum: number;
  voltage_1: number;
  voltage_2: number;
  voltage_3: number;
  current_1: number;
  current_2: number;
  current_3: number;
  va_1: number;
  va_2: number;
  va_3: number;
  var_1: number;
  var_2: number;
  var_3: number;
  pf_1: number;
  pf_2: number;
  pf_3: number;
  energy_im: number;
  energy_ex: number;
  freq: number;
  created_at: string;
  
}

interface LogTableProps {
  data: LogRow[]; // เพิ่ม field data สำหรับเก็บข้อมูลทั้งหมดในแต่ละแถว
  page: number; // เพิ่ม field page สำหรับเก็บหมายเลขหน้าในแต่ละแถว
  totalPages: number; // เพิ่ม field totalPages สำหรับเก็บจำนวนหน้าทั้งหมดในแต่ละแถว
  onPageChange: (page: number) => void; // เพิ่ม field onPageChange สำหรับฟังก์ชันเปลี่ยนหน้าในแต่ละแถว
}

const LogTable: React.FC<LogTableProps> = ({ data , page, totalPages, onPageChange
}) => {
  const downloadCSV = () => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) => headers.map((key) => (row as any)[key]).join(",")),
    ];
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "log_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Log Data</div>
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
                {Object.keys(data[0])
                  .filter((key) => key !== "id")
                  .flatMap((key) =>
                    key === "meter" ? ["meter_id", "meter_name"] : [key]
                  )
                  .map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.entries(row)
                    .filter(([key]) => key !== "id") // ❌ ไม่แสดง id
                    .flatMap(([key, value]) => {
                      if (
                        key === "meter" &&
                        typeof value === "object" &&
                        value !== null
                      ) {
                        return [
                          value.id || "", // ✅ แยกเป็น meter_id
                          value.name || "", // ✅ แยกเป็น meter_name
                        ];
                      } else {
                        return [value];
                      }
                    })
                    .map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>

        ) : (
          <p className={styles.noData}>No data available</p>
        )}

        
      </div>

      

        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => onPageChange(1)}
          >
            ⏮
          </button>

          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            ◀
          </button>

          {Array.from({ length: 10 }, (_, i) => {
            const startPage = Math.floor((page - 1) / 10) * 10 + 1;
            const pageNumber = startPage + i;

            if (pageNumber > totalPages) return null;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={page === pageNumber ? styles.activePage : ""}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            ▶
          </button>
        </div>




    </div>
  );
};

export default LogTable;
