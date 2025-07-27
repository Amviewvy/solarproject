import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboradController } from './dashborad/dashborad.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [DeviceModule],
  controllers: [AppController, DashboradController, DashboardController, DeviceController],
  providers: [AppService],
})
export class AppModule {}
