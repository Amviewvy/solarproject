import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { DeviceService } from './device.service';
import { Meter } from './entities/meter.entity';

@Controller('/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('meters')
  getAllMeters(): Promise<Meter[]> {
    return this.deviceService.getAllMeters();
  }

  @Post('meters')
  createMeter(@Body() body: Partial<Meter>) {
    return this.deviceService.createMeter(body);
  }
}
