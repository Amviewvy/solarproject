import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryRaw } from './entities/telemetry-raw.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelemetryRaw])],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}
