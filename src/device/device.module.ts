import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';

@Module({
  providers: [DeviceService]
})
export class DeviceModule {}
