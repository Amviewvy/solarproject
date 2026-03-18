import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CreateMeterMeasurementDto } from './dto/create-meter-measurement.dto';
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
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Get()
  @ApiQuery({ name: 'meter_id', required: false })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('meter_id') deviceId?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.measurementService.findAll(
      Number(page) || 1,
      Number(limit) || 50,
      deviceId,
      start,
      end,
    );
  }

  @Get('trend')
  @ApiQuery({ name: 'meter_id', required: true })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  findTrend(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('meter_id') deviceId?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    if (deviceId == null) return;
    return this.measurementService.findTrendData(
      Number(page) || 1,
      Number(limit) || 50,
      deviceId,
      start,
      end,
    );
  }

  //   @Get('export-stream')
  //   async exportStream(@Res() res: Response) {
  //     res.setHeader('Content-Type', 'text/csv');
  //     res.setHeader(
  //       'Content-Disposition',
  //       'attachment; filename="measurements_stream.csv"',
  //     );

  //     const queryRunner = this.dataSource.createQueryRunner();
  //     await queryRunner.connect();

  //     const stream = await queryRunner.stream(`
  //       SELECT m.id, m.measurement_time, m.watt_sum, m.volts_avg, m.current_sum,
  //              m.energy_im, m.energy_ex, m.freq, meter.name AS meter_name
  //       FROM meter_measurement m
  //       LEFT JOIN meters meter ON meter.id = m.meter_id
  //       ORDER BY m.measurement_time DESC
  //     `);

  //     const csvStream = fastcsv.format({ headers: true });

  //     stream.on('data', (row) => csvStream.write(row));
  //     stream.on('end', () => {
  //       csvStream.end();
  //       queryRunner.release();
  //     });

  //     csvStream.pipe(res);
  //   }

  //   //---------- New api 3 data ---------

  //   @Get('summary')
  // getMeterSummary(
  //   @Query('start') start?: string,
  //   @Query('end') end?: string,
  // ) {
  //   return this.measurementService.getMeterSummary(start, end);
  // }

  // //---------- End of New api 3 data ---------

  // @Get('today')
  // findToday(@Query('meter_id') meterId?: number) {
  //   return this.measurementService.findToday(meterId);

  // }

  // @Get('trend')
  // getTrend(
  //   @Query('meter_id') meterId: number,
  //   @Query('start') start: string,
  //   @Query('end') end: string,
  // ) {
  //   return this.measurementService.getTrendData(
  //     Number(meterId),
  //     start,
  //     end,
  //   );
  // }
}
