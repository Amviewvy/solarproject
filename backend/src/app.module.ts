import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ControlController } from './control/control.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';
import { UsersModule } from './users/users.module';
import { ControlModule } from './control/control.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ControlService } from './control/control.service';
import { UploadModule } from './secret/upload.module';

@Module({
  imports: [
    DeviceModule,
    AuthModule,
    DashboardModule,
    ControlModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
    UsersModule,
    UploadModule,
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
