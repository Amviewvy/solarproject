import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    getDashboard() {
        return this.dashboardService.getDashboard();
    }

    @Get('energy')
    getEnergyData() {
        return this.dashboardService.getEnergyData();
    }

    @Get('/summary')
    getSummary(){
        return{
            massage: 'OK',
            totalDevice: 10,
            totalEnergy: 5000,
            "data": [
    { "name": "Device 1", "power": 123, "lastUpdate": "2025-08-05T13:30:00Z" },
    { "name": "Device 2", "power": 456, "lastUpdate": "2025-08-05T14:00:00Z" }
  ]
        };
    }
}
