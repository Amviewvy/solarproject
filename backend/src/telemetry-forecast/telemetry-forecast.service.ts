import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TelemetryForecastService {
  constructor(private dataSource: DataSource) {}

  async findRange(deviceId: string, start?: string, end?: string, limit = 500) {
    const sql = `
      SELECT *
      FROM exymc.telemetry_forecast
      WHERE device_id = $1
      ${start ? 'AND ts >= $2' : ''}
      ${end ? (start ? 'AND ts <= $3' : 'AND ts <= $2') : ''}
      ORDER BY ts
      LIMIT ${limit}
    `;

    const params = [deviceId];

    if (start) params.push(start);
    if (end) params.push(end);

    return this.dataSource.query(sql, params);
  }

  async latest(deviceId: string) {
    const sql = `
      SELECT *
      FROM exymc.telemetry_forecast
      WHERE device_id = $1
      ORDER BY ts DESC
      LIMIT 1
    `;

    return this.dataSource.query(sql, [deviceId]);
  }

  async future(deviceId: string) {
    const sql = `
      SELECT *
      FROM exymc.telemetry_forecast
      WHERE device_id = $1
      AND ts >= now()
      ORDER BY ts
    `;

    return this.dataSource.query(sql, [deviceId]);
  }

  async deleteDeviceForecast(deviceId: string) {
    const sql = `
      DELETE FROM exymc.telemetry_forecast
      WHERE device_id = $1
    `;

    return this.dataSource.query(sql, [deviceId]);
  }
}
