import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Sensor } from './sensor.entity';

@Entity({ name: 'environment_data' })
export class EnvironmentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  temperature?: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  humidity?: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  pyranometer?: number;

  @ManyToOne(() => Sensor, (sensor) => sensor.environment_data)
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;
}
