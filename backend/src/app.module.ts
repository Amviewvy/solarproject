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
import { DashboardModule } from './dashboard/dashboard.module';
import { ControlService } from './control/control.service';
import { ControlModule } from './control/control.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';



@Module({
  imports: [DeviceModule, AuthModule, DashboardModule, ControlModule,
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   // ใส่ user ของคุณ
      password: 'mysecretpassword',       // ใส่ password ของคุณ
      database: 'mydatabase',
      autoLoadEntities: true,
      synchronize: false, // dev mode เท่านั้น
    })

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
