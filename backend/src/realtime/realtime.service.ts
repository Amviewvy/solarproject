import { Injectable } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';

@Injectable()
export class RealtimeService {
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  notifyMeasurementUpdated(deviceId: string) {
    this.realtimeGateway.emitMeasurementUpdated(deviceId);
  }
}
