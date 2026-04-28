import { Model } from "src/catalog/entities/model.entity";
import { DeviceType } from "src/common/enum";
import { SystemLog } from "src/logs/entities/system-log.entity";
import { PollRun } from "src/polling/entities/poll-run.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeviceConnection } from "./device-connection.entity";
import { DeviceRegister } from "./device-register.entity";

@Index('uq_devices_name_active', ['name'], {
  unique: true,
  where: `"deleted_at" IS NULL`,
})
@Entity({ schema: 'exymc', name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'enum',
    name: 'device_type',
    enum: DeviceType,
    enumName: 'device_type',
  })
  deviceType: DeviceType;

  @Column({ type: 'bigint', name: 'model_id', nullable: true })
  modelId: string | null;

  @ManyToOne(() => Model, (model) => model.devices, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'model_id' })
  model: Model | null;

  @Column({ type: 'text', nullable: true })
  location: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', name: 'is_enabled', default: true })
  isEnabled: boolean;

  @Column({ type: 'text', nullable: true })
  status: string | null;

  @Column({ type: 'timestamptz', name: 'last_seen_at', nullable: true })
  lastSeenAt: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => DeviceConnection, (connection) => connection.device)
  deviceConnections: DeviceConnection[];

  @OneToMany(() => DeviceRegister, (deviceRegister) => deviceRegister.device)
  deviceRegisters: DeviceRegister[];

  @OneToMany(() => PollRun, (pollRun) => pollRun.device)
  pollRuns: PollRun[];

  @OneToMany(() => SystemLog, (log) => log.device)
  systemLogs: SystemLog[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}