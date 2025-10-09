import React, { useEffect, useState } from "react";

import { socket } from "../socket";

interface MeterMeasurement {
  id: number;
  measurement_time: string;
  volts_avg: number;
  current_sum: number;
  watt_sum: number;
  freq: number;
}

export default function LiveMeter() {
  const [data, setData] = useState<MeterMeasurement | null>(null);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    // ✅ Handle connection status
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    // ✅ Subscribe to your "newData" event
    socket.on("newData", (measurement: MeterMeasurement) => {
      setData(measurement); // <-- update React state
    });

    // ✅ Cleanup when component unmounts
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newData");
    };
  }, []);

  return (
    <div style={{ padding: 20, border: "1px solid gray", borderRadius: 10 }}>
      <div style={{ color: connected ? "green" : "red" }}>
        {connected ? "🟢 Live" : "🔴 Reconnecting..."}
      </div>

      <h2>Live Meter Data</h2>
      {data ? (
        <div>
          <p>Voltage: {data.volts_avg.toFixed(2)} V</p>
          <p>Current: {data.current_sum.toFixed(3)} A</p>
          <p>Power: {data.watt_sum.toFixed(2)} W</p>
          <p>Frequency: {data.freq.toFixed(2)} Hz</p>
          <p>
            Timestamp:{" "}
            {new Date(data.measurement_time).toLocaleTimeString("en-US")}
          </p>
        </div>
      ) : (
        <p>Waiting for live data...</p>
      )}
    </div>
  );
}
