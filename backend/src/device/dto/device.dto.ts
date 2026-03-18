import { IsOptional } from 'class-validator';

export class DeviceWithTrendData {
  device_id: string;
  device_name: string;

  @IsOptional()
  volts_avg?: number;

  @IsOptional()
  current_sum?: number;

  @IsOptional()
  watt_sum?: number;
}
