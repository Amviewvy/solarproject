import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ControlController } from './control/control.controller';
import { ControlModule } from './control/control.module';
import { ControlService } from './control/control.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardService } from './dashboard/dashboard.service';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    DeviceModule,
    AuthModule,
    DashboardModule,
    ControlModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    DashboardController,
    DeviceController,
    AuthController,
    ControlController,
  ],
  providers: [AppService, DashboardService, ControlService],
})
export class AppModule {}
