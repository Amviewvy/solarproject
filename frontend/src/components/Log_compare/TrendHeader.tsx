import { useEffect } from 'react';
import styles from './TrendChart.module.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../ui/select';
import type { Device } from '../../types/common';

interface TrendHeaderProps {
  selectedMeter: Device | null;
  setSelectedMeter: (value: Device) => void;
  meters: Device[];
}

const API_URL = import.meta.env.VITE_API_URL;

// const TrendHeader: React.FC<TrendHeaderProps> = ({ selectedMeter, setSelectedMeter }) => {

//   const meterOptions = Array.from({ length: 11 }, (_, i) => `Meter_${i + 1}`);
//   async function fetchDevice() {
//     const response = await fetch(`${API_URL}/devices?device_type=meter`);
//     const data = await response.json();
//     console.log(data);
//   }

//   useEffect(() => {
//     fetchDevice();
//   }, []);

//   const handleMeterChange = (value: Device) => {
//     setSelectedMeter(value);
//   };

//   return (
//     <div className={styles.headerContainer}>
//       <div className={styles.headerTop}>
//         <h3 className={styles.headerTitle}>Trend Overview</h3>

//         {/* Meter Selection */}
//         <Select onValueChange={handleMeterChange} value={selectedMeter}>
//           <SelectTrigger className={styles.selectTrigger}>
//             <SelectValue placeholder="Select meter" />
//           </SelectTrigger>
//           <SelectContent>
//             {meterOptions.map((option) => (
//               <SelectItem key={option} value={option}>
//                 {option}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// };

function TrendHeader({ selectedMeter, setSelectedMeter, meters }: TrendHeaderProps) {
  async function fetchDevice() {
    try {
      const response = await fetch(`${API_URL}/devices?device_type=meter`);
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      // const data = await response.json;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDevice();
  }, []);

  const handleMeterChange = (value: string) => {
    const meter = meters.find((m) => String(m.id) === value);
    if (meter) {
      setSelectedMeter(meter);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <h3 className={styles.headerTitle}>Trend Overview</h3>

        {/* Meter Selection */}
        <Select
          onValueChange={handleMeterChange}
          value={selectedMeter ? String(selectedMeter.id) : ''}
        >
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder="Select meter" />
          </SelectTrigger>
          <SelectContent>
            {meters.map((meter) => (
              <SelectItem key={meter.id} value={meter.id}>
                {meter.name} {meter?.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TrendHeader;
