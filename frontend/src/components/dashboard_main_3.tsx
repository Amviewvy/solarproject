import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard_main_3.module.css';
import EnergyPieChart from './EnergyPieChart_body';
import MediumSafety from './PLC_inverter_control_crad';
import MeterTable from './MeterTable';
const API_URL = import.meta.env.VITE_API_URL;

interface percentageInterface {
  import: number;
  export: number;
}

const Dashboard_main_3: React.FC = () => {
  const [importValue, setImportValue] = useState<number>(0);
  const [exportValue, setExportValue] = useState<number>(0);
  const [mainDeviceId, setMainDeviceId] = useState<string>('');
  const [totalImport, setTotalImport] = useState<number>(0);
  const [totalExport, setTotalExport] = useState<number>(0);
  const [percentage, setPercentage] = useState<percentageInterface>({
    import: 0,
    export: 0,
  });

  useEffect(() => {
    fetchMainDevice();
  }, []);

  async function fetchMainDevice() {
    const res = await fetch(`${API_URL}/devices/trend-latest`);
    const dataJson = await res.json();
    const devices = dataJson.data;

    if (devices.length > 0) {
      const main_device = devices.find((d: any) => d.location == 'Main');
      setMainDeviceId(main_device.device_id);
    } else {
      setMainDeviceId('');
    }
  }

  async function fetchConsumptionEnergy() {
    const res = await fetch(`${API_URL}/measurements/energy-consumption?device_id=${mainDeviceId}`);
    const rawJson = await res.json();
    const data_export = rawJson.export;
    const data_import = rawJson.import;
    const total_export = data_export.reduce(
      (sum: number, item: any) => sum + Number(item.value),
      0,
    );
    const total_import = data_import.reduce(
      (sum: number, item: any) => sum + Number(item.value),
      0,
    );

    const total = total_import + total_export;
    const export_percentage = (total_export / total) * 100;
    const import_precentage = (total_import / total) * 100;

    setTotalExport(total_export);
    setTotalImport(total_import);
    setPercentage({
      export: export_percentage,
      import: import_precentage,
    });
  }

  useEffect(() => {
    if (mainDeviceId === '') return;
    fetchConsumptionEnergy();
  }, [mainDeviceId]);

  return (
    <div className={styles.parent}>
      <div className={styles.div1}>
        <MeterTable />
      </div>
      <div className={styles.div2}>
        <EnergyPieChart importValue={percentage.import} exportValue={percentage.export} />
      </div>
      <div className={styles.div3}>
        <MediumSafety />
      </div>
    </div>
  );
};

export default Dashboard_main_3;
