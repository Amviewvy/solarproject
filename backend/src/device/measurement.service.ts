import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { TelemetryRaw } from 'src/telemetry/entities/telemetry-raw.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly realtimeGateway: RealtimeGateway,
  ) {}

  async findAll(page = 1, limit = 50, deviceId?: string, start?: string, end?: string) {
    const offset = (page - 1) * limit;

    const sql = `
        SELECT
          d.name AS device_name,
          tr.ts AS measurement_time,
          MAX(CASE WHEN rd.label = 'Volts 1' THEN tr.value_num END) AS Volts_1,
          MAX(CASE WHEN rd.label = 'Volts 2' THEN tr.value_num END) AS Volts_2,
          MAX(CASE WHEN rd.label = 'Volts 3' THEN tr.value_num END) AS Volts_3,
          MAX(CASE WHEN rd.label = 'Current 1' THEN tr.value_num END) AS Current_1,
          MAX(CASE WHEN rd.label = 'Current 2' THEN tr.value_num END) AS Current_2,
          MAX(CASE WHEN rd.label = 'Current 3' THEN tr.value_num END) AS Current_3,
          MAX(CASE WHEN rd.label = 'W1' THEN tr.value_num END) AS W1,
          MAX(CASE WHEN rd.label = 'W2' THEN tr.value_num END) AS W2,
          MAX(CASE WHEN rd.label = 'W3' THEN tr.value_num END) AS W3,
          MAX(CASE WHEN rd.label = 'VA1' THEN tr.value_num END) AS VA1,
          MAX(CASE WHEN rd.label = 'VA2' THEN tr.value_num END) AS VA2,
          MAX(CASE WHEN rd.label = 'VA3' THEN tr.value_num END) AS VA3,
          MAX(CASE WHEN rd.label = 'VAR1' THEN tr.value_num END) AS VAR1,
          MAX(CASE WHEN rd.label = 'VAR2' THEN tr.value_num END) AS VAR2,
          MAX(CASE WHEN rd.label = 'VAR3' THEN tr.value_num END) AS VAR3,
          MAX(CASE WHEN rd.label = 'PF1' THEN tr.value_num END) AS PF1,
          MAX(CASE WHEN rd.label = 'PF2' THEN tr.value_num END) AS PF2,
          MAX(CASE WHEN rd.label = 'PF3' THEN tr.value_num END) AS PF3,
          MAX(CASE WHEN rd.label = 'Phase Angle 1' THEN tr.value_num END) AS Phase_Angle_1,
          MAX(CASE WHEN rd.label = 'Phase Angle 2' THEN tr.value_num END) AS Phase_Angle_2,
          MAX(CASE WHEN rd.label = 'Phase Angle 3' THEN tr.value_num END) AS Phase_Angle_3,
          MAX(CASE WHEN rd.label = 'Volts Ave' THEN tr.value_num END) AS Volts_Ave,
          MAX(CASE WHEN rd.label = 'Volts Sum' THEN tr.value_num END) AS Volts_Sum,
          MAX(CASE WHEN rd.label = 'Current Ave' THEN tr.value_num END) AS Current_Ave,
          MAX(CASE WHEN rd.label = 'Current Sum' THEN tr.value_num END) AS Current_Sum,
          MAX(CASE WHEN rd.label = 'Watts Ave' THEN tr.value_num END) AS Watts_Ave,
          MAX(CASE WHEN rd.label = 'Watts Sum' THEN tr.value_num END) AS Watts_Sum,
          MAX(CASE WHEN rd.label = 'VA Ave' THEN tr.value_num END) AS VA_Ave,
          MAX(CASE WHEN rd.label = 'VA Sum' THEN tr.value_num END) AS VA_Sum,
          MAX(CASE WHEN rd.label = 'VAr Ave' THEN tr.value_num END) AS VAr_Ave,
          MAX(CASE WHEN rd.label = 'VAr Sum' THEN tr.value_num END) AS VAr_Sum,
          MAX(CASE WHEN rd.label = 'PF Ave' THEN tr.value_num END) AS PF_Ave,
          MAX(CASE WHEN rd.label = 'PF Sum' THEN tr.value_num END) AS PF_Sum,
          MAX(CASE WHEN rd.label = 'Phase Angle Ave' THEN tr.value_num END) AS Phase_Angle_Ave,
          MAX(CASE WHEN rd.label = 'Phase Angle Sum' THEN tr.value_num END) AS Phase_Angle_Sum,
          MAX(CASE WHEN rd.label = 'Freq' THEN tr.value_num END) AS Freq,
          MAX(CASE WHEN rd.label = 'Wh Import' THEN tr.value_num END) AS Wh_Import,
          MAX(CASE WHEN rd.label = 'Wh Export' THEN tr.value_num END) AS Wh_Export,
          MAX(CASE WHEN rd.label = 'VARh Import' THEN tr.value_num END) AS VARh_Import,
          MAX(CASE WHEN rd.label = 'VARh Export' THEN tr.value_num END) AS VARh_Export,
          MAX(CASE WHEN rd.label = 'VAh' THEN tr.value_num END) AS VAh,
          MAX(CASE WHEN rd.label = 'W Demand (Import)' THEN tr.value_num END) AS W_Demand_Import,
          MAX(CASE WHEN rd.label = 'W Max Demand (Import)' THEN tr.value_num END) AS W_Max_Demand_Import,
          MAX(CASE WHEN rd.label = 'W Demand (Export)' THEN tr.value_num END) AS W_Demand_Export,
          MAX(CASE WHEN rd.label = 'W Max Demand (Export)' THEN tr.value_num END) AS W_Max_Demand_Export,
          MAX(CASE WHEN rd.label = 'VA Demand' THEN tr.value_num END) AS VA_Demand,
          MAX(CASE WHEN rd.label = 'VA Max Demand' THEN tr.value_num END) AS VA_Max_Demand,
          MAX(CASE WHEN rd.label = 'A Demand' THEN tr.value_num END) AS A_Demand,
          MAX(CASE WHEN rd.label = 'A Max Demand' THEN tr.value_num END) AS A_Max_Demand,
          MAX(CASE WHEN rd.label = 'Volts Ave Max' THEN tr.value_num END) AS Volts_Ave_Max,
          MAX(CASE WHEN rd.label = 'Volts Ave Min' THEN tr.value_num END) AS Volts_Ave_Min,
          MAX(CASE WHEN rd.label = 'Current Ave Max' THEN tr.value_num END) AS Current_Ave_Max,
          MAX(CASE WHEN rd.label = 'Current Ave Min' THEN tr.value_num END) AS Current_Ave_Min,
          MAX(CASE WHEN rd.label = 'VL 1-2 (Calculated)' THEN tr.value_num END) AS VL_1_2_Calculated,
          MAX(CASE WHEN rd.label = 'VL 2-3 (Calculated)' THEN tr.value_num END) AS VL_2_3_Calculated,
          MAX(CASE WHEN rd.label = 'VL 3-1 (Calculated)' THEN tr.value_num END) AS VL_3_1_Calculated,
          MAX(CASE WHEN rd.label = 'Run Hour' THEN tr.value_num END) AS Run_Hour,
          MAX(CASE WHEN rd.label = 'On Hour' THEN tr.value_num END) AS On_Hour,
          MAX(CASE WHEN rd.label = 'No. Of Interrupts' THEN tr.value_num END) AS No_Of_Interrupts
        FROM exymc.devices d
        JOIN exymc.device_registers dr
          ON dr.device_id = d.id
          AND d.deleted_at IS NULL
        JOIN exymc.model_registers mr
          ON mr.id = dr.model_register_id
        JOIN exymc.register_definitions rd
          ON rd.id = mr.register_definition_id
        JOIN exymc.telemetry_raw tr
          ON tr.device_register_id = dr.id
        WHERE ($1::uuid IS NULL OR d.id = $1)
          AND ($2::timestamptz IS NULL OR tr.ts >= $2)
          AND ($3::timestamptz IS NULL OR tr.ts <= $3)
        GROUP BY tr.ts, d.name
        ORDER BY tr.ts DESC
        LIMIT $4 OFFSET $5
      `;

    const countSql = `
    SELECT COUNT(DISTINCT tr.ts)
    FROM exymc.devices d
    JOIN exymc.device_registers dr
      ON dr.device_id = d.id
    JOIN exymc.model_registers mr
      ON mr.id = dr.model_register_id
    JOIN exymc.register_definitions rd
      ON rd.id = mr.register_definition_id
    JOIN exymc.telemetry_raw tr
      ON tr.device_register_id = dr.id
    WHERE ($1::uuid IS NULL OR d.id = $1)
      AND d.deleted_at IS NULL
      AND ($2::timestamptz IS NULL OR tr.ts >= $2)
      AND ($3::timestamptz IS NULL OR tr.ts <= $3)
    `;

    const data = await this.dataSource.query(sql, [
      deviceId ?? null,
      start ?? null,
      end ?? null,
      limit,
      offset,
    ]);

    const total = await this.dataSource.query(countSql, [
      deviceId ?? null,
      start ?? null,
      end ?? null,
    ]);

    const totalRows = Number(total[0].count);

    return {
      data,
      page,
      limit,
      totalPages: Math.ceil(totalRows / limit),
    };
  }

  async findTrendData(page = 1, limit = 50, deviceId: string, start?: string, end?: string) {
    const offset = (page - 1) * limit;
    const sql = `
        SELECT
          tr.ts AS measurement_time,
          MAX(CASE WHEN rd.label = 'Volts Ave' THEN tr.value_num END) AS Volts_Ave,
          MAX(CASE WHEN rd.label = 'Current Sum' THEN tr.value_num END) AS Current_Sum,
          MAX(CASE WHEN rd.label = 'Watts Sum' THEN tr.value_num END) AS Watts_Sum
        FROM exymc.devices d
        JOIN exymc.device_registers dr
          ON dr.device_id = d.id
        JOIN exymc.model_registers mr
          ON mr.id = dr.model_register_id
        JOIN exymc.register_definitions rd
          ON rd.id = mr.register_definition_id
        JOIN exymc.telemetry_raw tr
          ON tr.device_register_id = dr.id
        WHERE ($1::uuid IS NULL OR d.id = $1)
          AND ($2::timestamptz IS NULL OR tr.ts >= $2)
          AND ($3::timestamptz IS NULL OR tr.ts <= $3)
        GROUP BY tr.ts
        ORDER BY tr.ts DESC
        LIMIT $4 OFFSET $5
      `;

    const countSql = `
      SELECT COUNT(DISTINCT tr.ts)
      FROM exymc.devices d
      JOIN exymc.device_registers dr
        ON dr.device_id = d.id
      JOIN exymc.model_registers mr
        ON mr.id = dr.model_register_id
      JOIN exymc.register_definitions rd
        ON rd.id = mr.register_definition_id
      JOIN exymc.telemetry_raw tr
        ON tr.device_register_id = dr.id
      WHERE ($1::uuid IS NULL OR d.id = $1)
        AND ($2::timestamptz IS NULL OR tr.ts >= $2)
        AND ($3::timestamptz IS NULL OR tr.ts <= $3)
    `;

    const data = await this.dataSource.query(sql, [
      deviceId,
      start ?? null,
      end ?? null,
      limit,
      offset,
    ]);

    const total = await this.dataSource.query(countSql, [deviceId, start ?? null, end ?? null]);

    const totalRows = Number(total[0].count);

    return {
      data,
      page,
      limit,
      totalPages: totalRows,
    };
  }

  async GetEnergyConsumption(startOfDay?: string, endOfDay?: string) {
    const sql_import = `WITH base AS (
      SELECT
        tr.ts,
        tr.ts AT TIME ZONE 'Asia/Bangkok' AS ts_bkk,
        tr.value_num,
        tr.device_register_id
      FROM telemetry_raw tr
      LEFT JOIN device_registers dr ON dr.id = tr.device_register_id
      LEFT JOIN model_registers mr ON mr.id = dr.model_register_id
      LEFT JOIN register_definitions rd ON rd.id = mr.register_definition_id
      LEFT JOIN devices d ON d.id = dr.device_id AND d.deleted_at IS NULL
      WHERE rd.label = 'Wh Import'
        AND d.name = 'Meter #01'
        AND (tr.ts AT TIME ZONE 'Asia/Bangkok') >= DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Bangkok')
        AND (tr.ts AT TIME ZONE 'Asia/Bangkok') <  DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Bangkok') + INTERVAL '1 day'
      ),
      delta AS (
        SELECT
          ts,
          ts_bkk,
          device_register_id,
          value_num - LAG(value_num) OVER (
            PARTITION BY device_register_id
            ORDER BY ts ASC
          ) AS diff
        FROM base
      ),
      clean AS (
        SELECT
          ts_bkk,
          CASE
            WHEN diff IS NULL THEN NULL
            WHEN diff < 0 THEN 0
            ELSE diff
          END AS energy_wh
        FROM delta
      )
      SELECT
        TO_CHAR(DATE_TRUNC('hour', ts_bkk), 'HH24') AS time,
        ROUND(SUM(energy_wh)::numeric, 3) AS value
      FROM clean
      WHERE energy_wh IS NOT NULL
      GROUP BY DATE_TRUNC('hour', ts_bkk)
      ORDER BY DATE_TRUNC('hour', ts_bkk);`;

    const sql_export = `WITH base AS (
      SELECT
        tr.ts,
        tr.ts AT TIME ZONE 'Asia/Bangkok' AS ts_bkk,
        tr.value_num,
        tr.device_register_id
      FROM telemetry_raw tr
      LEFT JOIN device_registers dr ON dr.id = tr.device_register_id
      LEFT JOIN model_registers mr ON mr.id = dr.model_register_id
      LEFT JOIN register_definitions rd ON rd.id = mr.register_definition_id
      LEFT JOIN devices d ON d.id = dr.device_id AND d.deleted_at IS NULL
      WHERE rd.label = 'Wh Export'
        AND d.name = 'Meter #01'
        AND (tr.ts AT TIME ZONE 'Asia/Bangkok') >= DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Bangkok')
        AND (tr.ts AT TIME ZONE 'Asia/Bangkok') <  DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Bangkok') + INTERVAL '1 day'
      ),
      delta AS (
        SELECT
          ts,
          ts_bkk,
          device_register_id,
          value_num - LAG(value_num) OVER (
            PARTITION BY device_register_id
            ORDER BY ts ASC
          ) AS diff
        FROM base
      ),
      clean AS (
        SELECT
          ts_bkk,
          CASE
            WHEN diff IS NULL THEN NULL
            WHEN diff < 0 THEN 0
            ELSE diff
          END AS energy_wh
        FROM delta
      )
      SELECT
        TO_CHAR(DATE_TRUNC('hour', ts_bkk), 'HH24') AS time,
        ROUND(SUM(energy_wh)::numeric, 3) AS value
      FROM clean
      WHERE energy_wh IS NOT NULL
      GROUP BY DATE_TRUNC('hour', ts_bkk)
      ORDER BY DATE_TRUNC('hour', ts_bkk);`;
    const data_import = await this.dataSource.query(sql_import);
    const data_export = await this.dataSource.query(sql_export);
    return {
      import: data_import,
      export: data_export,
    };
  }

  //   //---------- New api 3 data ---------

  //   async getMeterSummary(start?: string, end?: string) {
  //   const qb = this.meterMeasurementRepo
  //     .createQueryBuilder('m')
  //     .leftJoin('m.meter', 'meter')
  //     .select('meter.id', 'meter_id')
  //     .addSelect('meter.name', 'meter_name')
  //     .addSelect('AVG(m.volts_avg)', 'avg_voltage')
  //     .addSelect('SUM(m.current_sum)', 'total_current')
  //     .addSelect('SUM(m.watt_sum)', 'total_power')
  //     .groupBy('meter.id')
  //     .addGroupBy('meter.name');

  //   if (start && end) {
  //     qb.andWhere('m.measurement_time BETWEEN :start AND :end', {
  //       start,
  //       end,
  //     });
  //   }

  //   return qb.getRawMany();
  // }

  // //---------- End of New api 3 data ---------

  // async findToday(meterId?: number) {
  //   const start = new Date();
  //   start.setHours(0, 0, 0, 0);

  //   const end = new Date();
  //   end.setHours(23, 59, 59, 999);

  //   const qb = this.meterMeasurementRepo
  //     .createQueryBuilder('m')
  //     .leftJoin('m.meter', 'meter')
  //     .addSelect(['meter.id', 'meter.name'])
  //     .where('m.measurement_time BETWEEN :start AND :end', {
  //       start,
  //       end,
  //     })
  //     .orderBy('m.measurement_time', 'DESC');

  //   if (meterId) {
  //     qb.andWhere('m.meter_id = :meterId', { meterId });
  //   }

  //   return qb.getMany();
  // }

  // async getTrendData(
  //   meterId: number,
  //   start: string,
  //   end: string,
  // ) {
  //   return this.meterMeasurementRepo
  //     .createQueryBuilder('m')
  //     .where('m.meter_id = :meterId', { meterId })
  //     .andWhere('DATE(m.measurement_time) BETWEEN :start AND :end', {
  //       start,
  //       end,
  //     })
  //     .orderBy('m.measurement_time', 'ASC') // สำคัญมาก
  //     .getMany();
  // }
}
