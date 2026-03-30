import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { ModelRegister } from 'src/catalog/entities/model-register.entity';
import { TelemetryRaw } from 'src/telemetry/entities/telemetry-raw.entity';
import { Telemetry10m } from 'src/telemetry/entities/telemetry-10m.entity';
import { Telemetry1h } from 'src/telemetry/entities/telemetry-1h.entity';
import { Telemetry6h } from 'src/telemetry/entities/telemetry-6h.entity';
import { Telemetry12h } from 'src/telemetry/entities/telemetry-12h.entity';

@Index('uq_device_registers_device_modelreg_active', ['deviceId', 'modelRegisterId'], {
  unique: true,
  where: `"deleted_at" IS NULL`,
})
@Entity({ schema: 'exymc', name: 'device_registers' })
export class DeviceRegister {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'device_id' })
  deviceId: string;

  @ManyToOne(() => Device, (device) => device.deviceRegisters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ type: 'bigint', name: 'model_register_id' })
  modelRegisterId: string;

  @ManyToOne(() => ModelRegister, (modelRegister) => modelRegister.deviceRegisters, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'model_register_id' })
  modelRegister: ModelRegister;

  @OneToMany(() => TelemetryRaw, (telemetry) => telemetry.deviceRegister)
  telemetryRows: TelemetryRaw[];

  @OneToMany(() => Telemetry10m, (t) => t.deviceRegister)
  telemetry10m: Telemetry10m[];

  @OneToMany(() => Telemetry1h, (t) => t.deviceRegister)
  telemetry1h: Telemetry10m[];

  @OneToMany(() => Telemetry6h, (t) => t.deviceRegister)
  telemetry6h: Telemetry6h[];

  @OneToMany(() => Telemetry12h, (t) => t.deviceRegister)
  telemetry12h: Telemetry12h[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
