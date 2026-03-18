import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { MeasurementModule } from './measurement.module';
import { Device } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Device
    ]),
    MeasurementModule,
  ],
  providers: [DeviceService],
  exports: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
