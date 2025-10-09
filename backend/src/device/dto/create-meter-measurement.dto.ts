import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateMeterMeasurementDto {
  @IsNumber()
  meter_id: number;

  @IsDateString()
  measurement_time: string;

  @IsOptional()
  volts_avg?: number;

  @IsOptional()
  current_sum?: number;

  @IsOptional()
  watt_sum?: number;
}
