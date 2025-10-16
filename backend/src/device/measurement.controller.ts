import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';

import { CreateMeterMeasurementDto } from './dto/create-meter-measurement.dto';
import { EnvironmentData } from './entities/environmentData.entity';
import { MeasurementService } from './measurement.service';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as fastcsv from 'fast-csv';
import { Response } from 'express';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('measurements')
export class MeasurementController {
  constructor(
    private readonly measurementService: MeasurementService,
    @InjectDataSource() private readonly dataSource: DataSource
  ) { }

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

  @Get()
  @ApiQuery({ name: 'meter_id', required: false})
  @ApiQuery({ name: 'start', required: false})
  @ApiQuery({ name: 'end', required: false})
  @ApiQuery({ name: 'field', required: false})
  @ApiQuery({ name: 'page', required: false, example: 1})
  @ApiQuery({ name: 'limit', required: false, example: 50})
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('meter_id') meterId?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('field') field?: string,
  ) {
    if (page && limit)
      return this.measurementService.findAll(+page || 1, +limit || 50, meterId, start, end, field)
    else if (page)
      return this.measurementService.findAll(+page || 1, 50, meterId, start, end, field)
    else if (limit)
      return this.measurementService.findAll(1, +limit || 50, meterId, start, end, field)
    return this.measurementService.findAll(1, 50, meterId, start, end, field)
  }

  @Get('export-stream')
  async exportStream(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="measurements_stream.csv"',
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const stream = await queryRunner.stream(`
      SELECT m.id, m.measurement_time, m.watt_sum, m.volts_avg, m.current_sum,
             m.energy_im, m.energy_ex, m.freq, meter.name AS meter_name
      FROM meter_measurement m
      LEFT JOIN meters meter ON meter.id = m.meter_id
      ORDER BY m.measurement_time DESC
    `);

    const csvStream = fastcsv.format({ headers: true });

    stream.on('data', (row) => csvStream.write(row));
    stream.on('end', () => {
      csvStream.end();
      queryRunner.release();
    });

    csvStream.pipe(res);
  }
  
}
