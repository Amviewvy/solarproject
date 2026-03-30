import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryRaw } from './entities/telemetry-raw.entity';
import { Telemetry10m } from './entities/telemetry-10m.entity';
import { Telemetry1h } from './entities/telemetry-1h.entity';
import { Telemetry6h } from './entities/telemetry-6h.entity';
import { Telemetry12h } from './entities/telemetry-12h.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TelemetryRaw, Telemetry10m, Telemetry1h, Telemetry6h, Telemetry12h]),
  ],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}
