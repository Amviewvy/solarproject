import { Injectable } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryRaw } from './entities/telemetry-raw.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(TelemetryRaw)
    private readonly _repo: Repository<TelemetryRaw>,
  ) {}

  create(createTelemetryDto: CreateTelemetryDto) {
    return 'This action adds a new telemetry';
  }

  findAll() {
    return this._repo.findAndCount({
      take: 10,
      relations: ['deviceRegister'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} telemetry`;
  }

  update(id: number, updateTelemetryDto: UpdateTelemetryDto) {
    return `This action updates a #${id} telemetry`;
  }

  remove(id: number) {
    return `This action removes a #${id} telemetry`;
  }
}
