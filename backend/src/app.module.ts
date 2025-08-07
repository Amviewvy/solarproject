import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ControlController } from './control/control.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ControlService } from './control/control.service';
import { ControlModule } from './control/control.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [DeviceModule, AuthModule, DashboardModule, ControlModule,
    ConfigModule.forRoot({ isGlobal: true}),
  ],
  controllers: [AppController, DashboardController, DeviceController, AuthController, ControlController],
  providers: [AppService, DashboardService, ControlService],
})
export class AppModule {}
