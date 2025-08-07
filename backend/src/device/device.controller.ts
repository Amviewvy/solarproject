import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('/device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Get()
    getDevices() : string {
        return this.deviceService.getAllDevices();
    }
}
