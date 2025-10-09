import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';

import { EnvironmentData } from './entities/environmentData.entity';
import { Meter } from './entities/meter.entity';
import { MeterMeasurement } from './entities/meterMeasurement.entity';
import { Sensor } from './entities/sensor.entity';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeterMeasurement,
      EnvironmentData,
      Meter,
      Sensor,
    ]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService, RealtimeGateway],
  exports: [MeasurementService],
})
export class MeasurementModule {}
