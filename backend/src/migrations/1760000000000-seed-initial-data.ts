import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1760000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // --- Meters ---
    await queryRunner.query(`
      INSERT INTO meters (id, name, model, serial_number, slave_id, location, installation_date, status, description, created_at, updated_at)
      VALUES
      (1, 'Main Building Meter', 'DTSU666', 'MTR-2025-001', 1, 'Rooftop - Solar Inverter Panel', '2025-10-08 09:45:00+07', 'active', 'Primary meter for solar inverter monitoring', NOW(), NOW()),
      (2, 'Lab Meter', 'SDM630', 'MTR-2025-002', 2, 'Electrical Engineering Lab', '2025-09-20 10:30:00+07', 'active', 'Used for power usage analysis in lab', NOW(), NOW()),
      (3, 'Dormitory Meter', 'DTSU666', 'MTR-2025-003', 3, 'Dorm Building A', '2025-09-01 15:00:00+07', 'inactive', 'Monitoring dorm energy usage', NOW(), NOW());
    `);

    // --- Meter Measurements ---
    await queryRunner.query(`
      INSERT INTO meter_measurement (
        id, meter_id, measurement_time, volts_avg, current_sum, watt_sum,
        voltage_1, voltage_2, voltage_3,
        current_1, current_2, current_3,
        va_1, va_2, va_3,
        var_1, var_2, var_3,
        pf_1, pf_2, pf_3,
        energy_im, energy_ex, freq, created_at
      )
      VALUES
      (1, 1, '2025-10-08 09:45:00+07', 229.56, 14.235, 3200.52,
        230.12, 229.88, 230.05,
        4.7231456, 4.8125623, 4.6998790,
        1086.25, 1079.67, 1082.42,
        103.18, 98.66, 101.25,
        0.98, 0.97, 0.99,
        150235.45, 1623.55, 49.98, NOW()),

      (2, 1, '2025-10-08 09:46:00+07', 230.10, 14.310, 3210.30,
        230.30, 229.90, 230.10,
        4.730, 4.820, 4.760,
        1088.00, 1080.50, 1083.00,
        103.50, 99.10, 101.70,
        0.98, 0.97, 0.99,
        150236.20, 1623.60, 49.99, NOW()),

      (3, 2, '2025-10-08 09:47:00+07', 228.95, 12.110, 2768.80,
        229.00, 228.90, 229.20,
        4.010, 4.030, 4.070,
        920.00, 915.00, 925.00,
        80.00, 81.00, 82.00,
        0.96, 0.95, 0.96,
        122530.50, 980.55, 49.95, NOW());
    `);

    // --- Sensors ---
    await queryRunner.query(`
      INSERT INTO sensors (id, name, type, model, serial_number, unit, location, status, installation_date, description, created_at, updated_at)
      VALUES
      (1, 'Outdoor Temperature Sensor', 'temperature', 'DHT22', 'SNS-2025-001', '°C', 'Rooftop', 'active', '2025-09-20 08:00:00+07', 'Measures ambient temperature', NOW(), NOW()),
      (2, 'Humidity Sensor', 'humidity', 'DHT22', 'SNS-2025-002', '%', 'Rooftop', 'active', '2025-09-20 08:05:00+07', 'Measures relative humidity', NOW(), NOW()),
      (3, 'Solar Pyranometer', 'pyranometer', 'SP Lite2', 'SNS-2025-003', 'W/m²', 'Rooftop', 'active', '2025-09-20 08:10:00+07', 'Measures solar irradiance', NOW(), NOW());
    `);

    // --- Environment Data ---
    await queryRunner.query(`
      INSERT INTO environment_data (created_at, temperature, humidity, pyranometer, sensor_id)
      VALUES
      ('2025-10-08 09:45:00+07', 34.20, 58.50, 850.25, 1),
      ('2025-10-08 09:46:00+07', 34.25, 58.60, 851.00, 1),
      ('2025-10-08 09:47:00+07', 34.30, 58.80, 852.50, 1),

      ('2025-10-08 09:45:00+07', NULL, 59.10, NULL, 2),
      ('2025-10-08 09:46:00+07', NULL, 59.20, NULL, 2),
      ('2025-10-08 09:47:00+07', NULL, 59.30, NULL, 2),

      ('2025-10-08 09:45:00+07', NULL, NULL, 860.55, 3),
      ('2025-10-08 09:46:00+07', NULL, NULL, 862.10, 3),
      ('2025-10-08 09:47:00+07', NULL, NULL, 863.00, 3);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // reverse seeding (delete inserted data)
    await queryRunner.query(`DELETE FROM environment_data;`);
    await queryRunner.query(`DELETE FROM meter_measurement;`);
    await queryRunner.query(`DELETE FROM sensors;`);
    await queryRunner.query(`DELETE FROM meters;`);
  }
}
