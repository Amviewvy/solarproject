export interface Device {
  name: string;
  id: string;
  location?: string;
  status?: string;
}

export interface DeviceWithTrendData {
  location?: string;
  device_id: string;
  device_name: string;
  volts_ave: number;
  current_sum: number;
  power_sum: number;
}

export interface TrafficData {
  time: string;
  value: number;
}

export interface ChartTrafficData {
  import: TrafficData[];
  export: TrafficData[];
}
