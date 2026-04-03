import { Injectable } from '@nestjs/common';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryRaw } from './entities/telemetry-raw.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { groupTelemetry } from 'src/common/groupTelemetry.util';
import { Telemetry10m } from './entities/telemetry-10m.entity';
import { Telemetry1h } from './entities/telemetry-1h.entity';
import { Telemetry6h } from './entities/telemetry-6h.entity';
import { Telemetry12h } from './entities/telemetry-12h.entity';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(TelemetryRaw)
    private readonly _repo: Repository<TelemetryRaw>,

    @InjectRepository(Telemetry10m)
    private readonly _repo10m: Repository<Telemetry10m>,

    @InjectRepository(Telemetry1h)
    private readonly _repo1h: Repository<Telemetry1h>,

    @InjectRepository(Telemetry6h)
    private readonly _repo6h: Repository<Telemetry6h>,

    @InjectRepository(Telemetry12h)
    private readonly _repo12h: Repository<Telemetry12h>,
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
    const qbRaw = this._repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.deviceRegister', 'dr')
      .leftJoinAndSelect('dr.modelRegister', 'mr')
      .leftJoinAndSelect('mr.registerDefinition', 'rd')
      .where('t.deviceRegisterId IS NOT NULL')
      .andWhere('dr.deviceId = :device_id', { device_id })
      .andWhere('t.pollRunId IS NOT NULL');

    if (register_names?.length) {
      qbRaw.andWhere('rd.label IN (:...register_names)', { register_names });
    }

    if (start && end) {
      qbRaw.andWhere('t.ts BETWEEN :start AND :end', { start, end });
    } else if (start) {
      qbRaw.andWhere('t.ts >= :start', { start });
    } else if (end) {
      qbRaw.andWhere('t.ts <= :end', { end });
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

    qbRaw.select([
      `${timeBucket} as ts`,
      'rd.label as label',
      'rd.unit as unit',
      'AVG(t.valueNum) as valueNum',
    ]);
    qbRaw.groupBy(`${timeBucket}, rd.label, rd.unit`);
    qbRaw.orderBy('ts', 'DESC');
    qbRaw.limit(limit);

    const rowsRaw = await qbRaw.getRawMany();
    const resultRaw = groupTelemetry(
      rowsRaw.map((r) => ({
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
    return resultRaw;
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

  async compareMeters(query: {
    device_ids: string;
    field: string;
    start?: string;
    end?: string;
    limit?: number;
  }) {
    const deviceIds = query.device_ids
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const limit = query.limit ?? 144;

    const qb = this._repo
      .createQueryBuilder('t')
      .leftJoin('t.deviceRegister', 'dr')
      .leftJoin('dr.device', 'd')
      .leftJoin('dr.modelRegister', 'mr')
      .leftJoin('mr.registerDefinition', 'rd')
      .where('t.deviceRegisterId IS NOT NULL')
      .andWhere('t.pollRunId IS NOT NULL')
      .andWhere('dr.deviceId IN (:...deviceIds)', { deviceIds })
      .andWhere('rd.label = :field', { field: query.field });

    if (query.start && query.end) {
      qb.andWhere('t.ts >= :start AND t.ts < :end', {
        start: query.start,
        end: query.end,
      });
    } else if (query.start) {
      qb.andWhere('t.ts >= :start', { start: query.start });
    } else if (query.end) {
      qb.andWhere('t.ts < :end', { end: query.end });
    }

    let timeBucket = 't.ts';

    if (query.start && query.end) {
      const rangeMs = new Date(query.end).getTime() - new Date(query.start).getTime();
      const hours = rangeMs / (1000 * 60 * 60);

      if (hours > 24 * 60) {
        timeBucket = `date_trunc('day', t.ts)`;
      } else if (hours > 24 * 14) {
        timeBucket = `date_trunc('hour', t.ts)`;
      } else if (hours > 24) {
        timeBucket = `date_trunc('minute', t.ts)`;
      }
    }

    qb.select([
      `${timeBucket} as ts`,
      'd.id as deviceId',
      'd.name as deviceName',
      'rd.label as label',
      'AVG(t.valueNum) as valueNum',
    ]);

    qb.groupBy(`${timeBucket}, d.id, d.name, rd.label`);
    qb.orderBy('ts', 'ASC');
    qb.limit(limit * Math.max(deviceIds.length, 1));

    const rows = await qb.getRawMany();

    const timeMap = new Map<string, Record<string, any>>();
    const series: { key: string; name: string }[] = [];
    const seenSeries = new Set<string>();

    for (const row of rows) {
      const ts = row.ts;
      const deviceId = row.deviceid ?? row.deviceId;
      const deviceName = row.devicename ?? row.deviceName;
      const value = Number(row.valuenum ?? row.valueNum);

      if (!seenSeries.has(deviceId)) {
        series.push({ key: deviceId, name: deviceName });
        seenSeries.add(deviceId);
      }

      if (!timeMap.has(ts)) {
        timeMap.set(ts, { time: ts });
      }

      timeMap.get(ts)![deviceId] = value;
    }

    return {
      field: query.field,
      series,
      data: Array.from(timeMap.values()),
    };
  }

  async compareFields(query: {
    device_id: string;
    fields: string;
    start?: string;
    end?: string;
    limit?: number;
  }) {
    const fields = query.fields
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const limit = query.limit ?? 144;

    const qb = this._repo
      .createQueryBuilder('t')
      .leftJoin('t.deviceRegister', 'dr')
      .leftJoin('dr.device', 'd')
      .leftJoin('dr.modelRegister', 'mr')
      .leftJoin('mr.registerDefinition', 'rd')
      .where('t.deviceRegisterId IS NOT NULL')
      .andWhere('t.pollRunId IS NOT NULL')
      .andWhere('dr.deviceId = :device_id', { device_id: query.device_id })
      .andWhere('rd.label IN (:...fields)', { fields });

    if (query.start && query.end) {
      qb.andWhere('t.ts >= :start AND t.ts < :end', {
        start: query.start,
        end: query.end,
      });
    } else if (query.start) {
      qb.andWhere('t.ts >= :start', { start: query.start });
    } else if (query.end) {
      qb.andWhere('t.ts < :end', { end: query.end });
    }

    let timeBucket = 't.ts';

    if (query.start && query.end) {
      const rangeMs = new Date(query.end).getTime() - new Date(query.start).getTime();
      const hours = rangeMs / (1000 * 60 * 60);

      if (hours > 24 * 60) {
        timeBucket = `date_trunc('day', t.ts)`;
      } else if (hours > 24 * 14) {
        timeBucket = `date_trunc('hour', t.ts)`;
      } else if (hours > 24) {
        timeBucket = `date_trunc('minute', t.ts)`;
      }
    }

    qb.select([
      `${timeBucket} as ts`,
      'd.id as deviceId',
      'd.name as deviceName',
      'rd.label as label',
      'rd.unit as unit',
      'AVG(t.valueNum) as valueNum',
    ]);

    qb.groupBy(`${timeBucket}, d.id, d.name, rd.label, rd.unit`);
    qb.orderBy('ts', 'ASC');
    qb.limit(limit * Math.max(fields.length, 1));

    const rows = await qb.getRawMany();

    const timeMap = new Map<string, Record<string, any>>();
    const series: { key: string; name: string; unit: string | null }[] = [];
    const seenSeries = new Set<string>();

    let deviceName: string | null = null;

    for (const row of rows) {
      const ts = row.ts;
      const label = row.label;
      const unit = row.unit ?? null;
      const value = Number(row.valuenum ?? row.valueNum);
      deviceName = row.devicename ?? row.deviceName ?? deviceName;

      if (!seenSeries.has(label)) {
        series.push({
          key: label,
          name: label,
          unit,
        });
        seenSeries.add(label);
      }

      if (!timeMap.has(ts)) {
        timeMap.set(ts, { time: ts });
      }

      timeMap.get(ts)![label] = value;
    }

    return {
      deviceId: query.device_id,
      deviceName,
      series,
      data: Array.from(timeMap.values()),
    };
  }
}
