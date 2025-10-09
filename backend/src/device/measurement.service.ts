import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { Repository } from 'typeorm';

import { CreateMeterMeasurementDto } from './dto/create-meter-measurement.dto';
import { EnvironmentData } from './entities/environmentData.entity';
import { Meter } from './entities/meter.entity';
import { MeterMeasurement } from './entities/meterMeasurement.entity';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(MeterMeasurement)
    private readonly meterMeasurementRepo: Repository<MeterMeasurement>,

    @InjectRepository(EnvironmentData)
    private readonly environmentDataRepo: Repository<EnvironmentData>,

    @InjectRepository(Meter)
    private readonly meterRepo: Repository<Meter>,

    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,

    private readonly realtimeGateway: RealtimeGateway,
  ) {}

  async createMeterMeasurement(data: CreateMeterMeasurementDto) {
    const meter = await this.meterRepo.findOne({
      where: { id: data.meter_id },
    });
    if (!meter) throw new NotFoundException('Meter not found');

    const measurement = this.meterMeasurementRepo.create({
      ...data,
      meter,
    });
    const saved = await this.meterMeasurementRepo.save(measurement);
    this.realtimeGateway.sendNewDataUpdate(saved);

    return saved;
  }

  async getAllMeterMeasurements() {
    return this.meterMeasurementRepo.find({
      order: { measurement_time: 'DESC' },
      take: 100,
    });
  }

  async getMeterMeasurementById(id: number) {
    const record = await this.meterMeasurementRepo.findOne({ where: { id } });
    if (!record)
      throw new NotFoundException(`Meter measurement ${id} not found`);
    return record;
  }

  async createEnvironmentData(data: Partial<EnvironmentData>) {
    const newRecord = this.environmentDataRepo.create(data);
    return this.environmentDataRepo.save(newRecord);
  }

  async getAllEnvironmentData() {
    return this.environmentDataRepo.find({
      order: { created_at: 'DESC' },
      take: 100,
    });
  }

  async getEnvironmentDataByTime(time: Date) {
    return this.environmentDataRepo.findOne({ where: { created_at: time } });
  }
}
