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

export interface DataTrendChart {
  ts: String;
  Volts1: number;
  Volts2: number;
  Volts3: number;
  Current1: number;
  Current2: number;
  Current3: number;
  W1: number;
  W2: number;
  W3: number;
  VA1: number;
  VA2: number;
  VA3: number;
  VAR1: number;
  VAR2: number;
  VAR3: number;
}
