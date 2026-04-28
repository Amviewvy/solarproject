import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/plc_inverter_log.module.css';
import { socket } from '../../socket';

interface LogItem {
  message: string;
  timestamp: string;
}

const LogBox: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    socket.on('plcLog', (data: LogItem) => {
      setLogs((prev) => [data, ...prev.slice(0, 50)]);
    });

    return () => {
      socket.off('plcLog');
    };
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundBox}>

        <div className={styles.labelBox}>
          <div className={styles.labelText}>LOG</div>
        </div>
        <div className={styles.logContent} ref={logRef}>
          {logs.map((log, index) => {
            const isOn = log.message.includes('ON');

            return (
              <div
                key={index}
                className={`${styles.logItem} ${
                  isOn ? styles.logOn : styles.logOff
                }`}
              >
                <span className={styles.logTime}>
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                {log.message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogBox;