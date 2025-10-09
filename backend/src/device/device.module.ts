import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { EnvironmentData } from './entities/environmentData.entity';
import { Meter } from './entities/meter.entity';
import { MeterMeasurement } from './entities/meterMeasurement.entity';
import { Sensor } from './entities/sensor.entity';
import { MeasurementModule } from './measurement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeterMeasurement,
      EnvironmentData,
      Meter,
      Sensor,
    ]),
    MeasurementModule,
  ],
  providers: [DeviceService],
  exports: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
