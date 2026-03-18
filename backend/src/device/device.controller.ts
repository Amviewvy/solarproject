import { BadRequestException, Body, Controller, Post, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { DeviceService } from './device.service';
import { ApiQuery } from '@nestjs/swagger';
import { DeviceType } from 'src/common/enum';

@Controller('/devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  @ApiQuery({ name: 'device_type', required: true })
  async GetAll(@Query('device_type') type: string) {
    if (!Object.values(DeviceType).includes(type as DeviceType)) {
      throw new BadRequestException('Invalid device type');
    }
    const result = await this.deviceService.GetAll(type as DeviceType);
    return { result };
  }

  @Get('trend-latest')
  @ApiQuery({ name: 'device_ids', required: false })
  async GetAllWithTrendDataLatest(@Query('device_ids') device_ids?: string) {
    const ids = device_ids?.split(',');
    return this.deviceService.GetAllWithTrendDataLatest(ids);
  }
}
