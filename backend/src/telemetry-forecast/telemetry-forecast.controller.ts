import { Controller, Get, Query, Param, Delete } from '@nestjs/common';
import { TelemetryForecastService } from './telemetry-forecast.service';

@Controller('telemetry-forecast')
export class TelemetryForecastController {
  constructor(private readonly service: TelemetryForecastService) {}

  @Get()
  findRange(
    @Query('device_id') deviceId: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('limit') limit = 500,
  ) {
    return this.service.findRange(deviceId, start, end, limit);
  }

  @Get('latest/:device_id')
  latest(@Param('device_id') deviceId: string) {
    return this.service.latest(deviceId);
  }

  @Get('future/:device_id')
  future(@Param('device_id') deviceId: string) {
    return this.service.future(deviceId);
  }

  @Delete(':device_id')
  delete(@Param('device_id') deviceId: string) {
    return this.service.deleteDeviceForecast(deviceId);
  }
}
