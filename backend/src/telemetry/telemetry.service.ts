import { Injectable } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryRaw } from './entities/telemetry-raw.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { groupTelemetry } from 'src/common/groupTelemetry.util';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(TelemetryRaw)
    private readonly _repo: Repository<TelemetryRaw>,
  ) {}

  create(createTelemetryDto: CreateTelemetryDto) {
    return 'This action adds a new telemetry';
  }

  async findAllAutoAggregrate(
    device_id: string,
    limit: number = 50,
    register_names?: string[],
    start?: string,
    end?: string,
  ) {
    const qb = this._repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.deviceRegister', 'dr')
      .leftJoinAndSelect('dr.modelRegister', 'mr')
      .leftJoinAndSelect('mr.registerDefinition', 'rd')
      .where('t.deviceRegisterId IS NOT NULL')
      .andWhere('dr.deviceId = :device_id', { device_id })
      .andWhere('t.pollRunId IS NOT NULL');
    // .orderBy('t.ts', 'DESC')
    // .take(limit);

    if (register_names?.length) {
      qb.andWhere('rd.label IN (:...register_names)', { register_names });
    }

    if (start && end) {
      qb.andWhere('t.ts BETWEEN :start AND :end', { start, end });
    } else if (start) {
      qb.andWhere('t.ts >= :start', { start });
    } else if (end) {
      qb.andWhere('t.ts <= :end', { end });
    }
    let timeBucket = 't.ts';

    if (start && end) {
      const rangeMs = new Date(end).getTime() - new Date(start).getTime();
      const hours = rangeMs / (1000 * 60 * 60);

      if (hours > 24 * 30) {
        timeBucket = `date_trunc('day', t.ts)`;
      } else if (hours > 24 * 7) {
        timeBucket = `date_trunc('hour', t.ts)`;
      } else if (hours > 24) {
        timeBucket = `date_trunc('minute', t.ts)`;
      }
    }

    qb.select([
      `${timeBucket} as ts`,
      'rd.label as label',
      'rd.unit as unit',
      'AVG(t.valueNum) as valueNum',
    ]);
    qb.groupBy(`${timeBucket}, rd.label, rd.unit`);
    qb.orderBy('ts', 'DESC');
    qb.limit(limit);

    const rows = await qb.getRawMany();

    return groupTelemetry(
      rows.map((r) => ({
        ts: r.ts,
        valueNum: Number(r.valuenum ?? r.valueNum),
        deviceRegister: {
          modelRegister: {
            registerDefinition: {
              label: r.label,
              unit: r.unit,
            },
          },
        },
      })),
    );
  }

  async findAllGetFull(
    device_id: string,
    limit: number = 50,
    register_names?: string[],
    start?: string,
    end?: string,
  ) {
    const qb = this._repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.deviceRegister', 'dr')
      .leftJoinAndSelect('dr.modelRegister', 'mr')
      .leftJoinAndSelect('mr.registerDefinition', 'rd')
      .where('t.deviceRegisterId IS NOT NULL')
      .andWhere('dr.deviceId = :device_id', { device_id })
      .andWhere('t.pollRunId IS NOT NULL');
    // .orderBy('t.ts', 'DESC')
    // .take(limit);

    if (register_names?.length) {
      qb.andWhere('rd.label IN (:...register_names)', { register_names });
    }

    if (start && end) {
      qb.andWhere('t.ts BETWEEN :start AND :end', { start, end });
    } else if (start) {
      qb.andWhere('t.ts >= :start', { start });
    } else if (end) {
      qb.andWhere('t.ts <= :end', { end });
    }
    let timeBucket = 't.ts';

    qb.select([
      `${timeBucket} as ts`,
      'rd.label as label',
      'rd.unit as unit',
      'AVG(t.valueNum) as valueNum',
    ]);
    qb.groupBy(`${timeBucket}, rd.label, rd.unit`);
    qb.orderBy('ts', 'DESC');
    qb.limit(limit);

    const rows = await qb.getRawMany();

    return groupTelemetry(
      rows.map((r) => ({
        ts: r.ts,
        valueNum: Number(r.valuenum ?? r.valueNum),
        deviceRegister: {
          modelRegister: {
            registerDefinition: {
              label: r.label,
              unit: r.unit,
            },
          },
        },
      })),
    );
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
