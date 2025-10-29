import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Meter } from './meter.entity';

@Entity('meter_measurement')
export class MeterMeasurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meter, (meter) => meter.measurements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meter_id' })
  meter: Meter;


  @Column({ type: 'timestamptz' })
  measurement_time: Date;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  volts_avg?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  current_sum?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  watt_sum?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  voltage_1?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  voltage_2?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  voltage_3?: number;

  @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
  current_1?: number;

  @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
  current_2?: number;

  @Column({ type: 'numeric', precision: 10, scale: 7, nullable: true })
  current_3?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  va_1?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  va_2?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  va_3?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  var_1?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  var_2?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  var_3?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  pf_1?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  pf_2?: number;

  @Column({ type: 'numeric', precision: 12, scale: 5, nullable: true })
  pf_3?: number;

  @Column({ type: 'numeric', precision: 14, scale: 5, nullable: true })
  energy_im?: number;

  @Column({ type: 'numeric', precision: 14, scale: 5, nullable: true })
  energy_ex?: number;

  @Column({ type: 'numeric', precision: 10, scale: 5, nullable: true })
  freq?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
