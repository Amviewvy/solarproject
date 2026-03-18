import { Body, Controller, Post } from '@nestjs/common';
import { RealtimeService } from './realtime.service';

class NotifyMeasurementDto {
  deviceId: string;
}

@Controller('realtime')
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}

  @Post('measurement-updated')
  notifyMeasurementUpdated(@Body() body: NotifyMeasurementDto) {
    this.realtimeService.notifyMeasurementUpdated(body.deviceId);
    return { success: true };
  }
}
