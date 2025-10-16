import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvironmentData } from './entities/environmentData.entity';
import { Meter } from './entities/meter.entity';
import { MeterMeasurement } from './entities/meterMeasurement.entity';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(MeterMeasurement)
    private readonly meterMeasurementRepo: Repository<MeterMeasurement>,
    @InjectRepository(EnvironmentData)
    private readonly EnvironmentDataRepo: Repository<EnvironmentData>,
    @InjectRepository(Meter)
    private readonly meterRepo: Repository<Meter>,

    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
  ) {}

  async createMeter(meter: Partial<Meter>): Promise<Meter> {
    const newMeter = this.meterRepo.create(meter);
    return this.meterRepo.save(newMeter);
  }

  async getAllMeters(): Promise<Meter[]> {
    return this.meterRepo.find();
  }

  async getOneMeter(id: number): Promise<Meter> {
    const meter = await this.meterRepo.findOne({
      where: { id },
      relations: ['measurements'],
    });
    if (!meter) throw new NotFoundException(`Meter with ID ${id} not found`);
    return meter;
  }

  async updateMeter(id: number, newMeter: Partial<Meter>): Promise<Meter> {
    const meter = await this.getOneMeter(id);
    Object.assign(meter, newMeter);
    return this.meterRepo.save(meter);
  }

  async deleteMeter(id: number): Promise<void> {
    const result = await this.meterRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Meter with ID ${id} not found`);
    }
  }

  async createSensor(data: Partial<Sensor>): Promise<Sensor> {
    const sensor = this.sensorRepo.create(data);
    return this.sensorRepo.save(sensor);
  }

  async getAllSensors(): Promise<Sensor[]> {
    return this.sensorRepo.find({ relations: ['environment_data'] });
  }

  async getOneSensor(id: number): Promise<Sensor> {
    const sensor = await this.sensorRepo.findOne({
      where: { id },
      relations: ['environment_data'],
    });
    if (!sensor) throw new NotFoundException(`Sensor with ID ${id} not found`);
    return sensor;
  }

  async updateSensor(id: number, data: Partial<Sensor>): Promise<Sensor> {
    const sensor = await this.getOneSensor(id);
    Object.assign(sensor, data);
    return this.sensorRepo.save(sensor);
  }

  async deleteSensor(id: number): Promise<void> {
    const result = await this.sensorRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
  }

  getAllDevices(): string {
    // This is a placeholder implementation.
    // In a real application, this method would interact with a database or other data source.
    return 'List of all devices';
  }

  createMeterMeasurement(meterMeasurement: Partial<MeterMeasurement>) {
    return this.meterMeasurementRepo.create(meterMeasurement);
  }

  async getAllMeterMeasurements(): Promise<MeterMeasurement[]> {
    const meterMeasurement = await this.meterMeasurementRepo.find();
    return meterMeasurement;
  }
}
