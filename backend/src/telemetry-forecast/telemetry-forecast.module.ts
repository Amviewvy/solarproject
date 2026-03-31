import { Module } from '@nestjs/common';
import { TelemetryForecastService } from './telemetry-forecast.service';
import { TelemetryForecastController } from './telemetry-forecast.controller';

@Module({
  controllers: [TelemetryForecastController],
  providers: [TelemetryForecastService],
})
export class TelemetryForecastModule {}
