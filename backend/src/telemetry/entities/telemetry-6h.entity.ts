import { DeviceRegister } from 'src/device/entities/device-register.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('telemetry_6h')
@Index('ix_telemetry_6h_ts', ['ts'])
@Index('ix_telemetry_6h_device_ts', ['deviceRegisterId', 'ts'])
export class Telemetry6h {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'ts', type: 'timestamptz' })
  ts: Date;

  @Column({ name: 'device_register_id', type: 'bigint' })
  deviceRegisterId: string;

  @ManyToOne(() => DeviceRegister, (dr) => dr.telemetry10m, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_register_id' })
  deviceRegister: DeviceRegister;

  @Column({ name: 'value_avg', type: 'double precision', nullable: true })
  valueAvg: number | null;

  @Column({ name: 'value_min', type: 'double precision', nullable: true })
  valueMin: number | null;

  @Column({ name: 'value_max', type: 'double precision', nullable: true })
  valueMax: number | null;

  @Column({ name: 'value_last', type: 'double precision', nullable: true })
  valueLast: number | null;

  @Column({ name: 'sample_count', type: 'integer' })
  sampleCount: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
