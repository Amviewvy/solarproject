import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { DeviceType } from 'src/common/enum';
import { DeviceWithTrendData } from './dto/device.dto';
import { DeviceRegister } from './entities/device-register.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(DeviceRegister)
    private readonly deviceRegisterRepo: Repository<DeviceRegister>,
  ) {}

  async GetAll(type: DeviceType): Promise<Device[]> {
    const devices = await this.deviceRepo.find({
      where: {
        deviceType: type,
      },
    });
    return devices;
  }

  async GetAllWithTrendDataLatest(device_ids?: string[]) {
    const sql = `
    WITH latest_run AS (
      SELECT DISTINCT ON (pr.device_id)
        pr.device_id,
        pr.id AS poll_run_id,
        pr.started_at,
        pr.finished_at
      FROM exymc.poll_runs pr
      WHERE pr.status IN ('success', 'partial')
      ORDER BY pr.device_id, pr.started_at DESC, pr.created_at DESC
    )
    SELECT
      d.id AS device_id,
      d.status AS status,
      d.name AS device_name,
      d.location AS location,
      MAX(CASE WHEN rd.label = 'Volts Ave'   THEN tr.value_num END) AS volts_ave,
      MAX(CASE WHEN rd.label = 'Current Sum' THEN tr.value_num END) AS current_sum,
      MAX(CASE WHEN rd.label = 'Watts Sum'   THEN tr.value_num END) AS power_sum
    FROM latest_run lr
    JOIN exymc.devices d
      ON d.id = lr.device_id
    AND d.deleted_at IS NULL
    JOIN exymc.device_registers dr
      ON dr.device_id = d.id
    AND dr.deleted_at IS NULL
    JOIN exymc.model_registers mr
      ON mr.id = dr.model_register_id
    JOIN exymc.register_definitions rd
      ON rd.id = mr.register_definition_id
    JOIN exymc.telemetry_raw tr
      ON tr.device_register_id = dr.id
    AND tr.poll_run_id = lr.poll_run_id
    WHERE rd.label IN ('Volts Ave', 'Current Sum', 'Watts Sum')
          AND (
        $1::uuid[] IS NULL
        OR array_length($1::uuid[], 1) IS NULL
        OR d.id = ANY($1::uuid[])
      )
    GROUP BY d.id, d.name
    ORDER BY d.name;`;
    const deviceWithTrendData = await this.dataSource.query(sql, [
      device_ids?.length ? device_ids : null,
    ]);

    return {
      data: deviceWithTrendData,
    };
  }

  async GetDeviceRegister() {
    return this.deviceRegisterRepo.find({
      take: 10,
      relations: {
        modelRegister: {
          registerDefinition: true,
          model: true,
        },
      },
    });
  }

  async GetTelemetryData(device_id: string) {
    return this.deviceRepo.find({
      where: {
        id: device_id,
      },
      relations: [
        'deviceRegisters',
        'deviceRegisters.modelRegister.registerDefinition',
        'deviceRegisters.telemetryRows',
      ],
      select: {
        id: true,
        name: true,
        location: true,
        status: true,
        deviceRegisters: {
          id: true,
          modelRegister: {
            id: true,
            registerDefinition: {
              label: true,
              unit: true,
            },
          },
          telemetryRows: {
            ts: true,
            valueNum: true,
          },
        },
      },
    });
  }
}
