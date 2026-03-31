import { PartialType } from '@nestjs/swagger';
import { CreateTelemetryForecastDto } from './create-telemetry-forecast.dto';

export class UpdateTelemetryForecastDto extends PartialType(CreateTelemetryForecastDto) {}
