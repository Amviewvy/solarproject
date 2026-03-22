import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  create(@Body() createTelemetryDto: CreateTelemetryDto) {
    return this.telemetryService.create(createTelemetryDto);
  }

  @Get()
  @ApiQuery({ name: 'device_id', required: true })
  @ApiQuery({ name: 'register_names', required: false })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  findAll(
    @Query('device_id') device_id: string,
    @Query('register_names') register_names?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('limit') limit?: string,
  ) {
    const names = register_names?.split(',');
    const limit_cal = names?.length ? names?.length * Number(limit) : 50;
    return this.telemetryService.findAll(device_id, limit_cal, names, start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telemetryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTelemetryDto: UpdateTelemetryDto) {
    return this.telemetryService.update(+id, updateTelemetryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telemetryService.remove(+id);
  }
}
