import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';

import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    ]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService, RealtimeGateway],
  exports: [MeasurementService],
})
export class MeasurementModule {}
