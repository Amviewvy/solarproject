import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateMeterMeasurementDto } from './dto/create-meter-measurement.dto';
import { EnvironmentData } from './entities/environmentData.entity';
import { MeasurementService } from './measurement.service';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  // METER MEASUREMENTS
  @Post('meters')
  createMeterMeasurement(@Body() body: CreateMeterMeasurementDto) {
    return this.measurementService.createMeterMeasurement(body);
  }

  @Get('meters')
  getAllMeterMeasurements() {
    return this.measurementService.getAllMeterMeasurements();
  }

  @Get('meters/:id')
  getMeterMeasurement(@Param('id') id: number) {
    return this.measurementService.getMeterMeasurementById(id);
  }

  @Post('environment')
  createEnvironmentData(@Body() body: Partial<EnvironmentData>) {
    return this.measurementService.createEnvironmentData(body);
  }

  @Get('environment')
  getAllEnvironmentData() {
    return this.measurementService.getAllEnvironmentData();
  }
}
