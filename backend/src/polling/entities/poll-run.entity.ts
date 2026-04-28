import { PollStatus, TriggerType } from "src/common/enum";
import { Device } from "src/device/entities/device.entity";
import { SystemLog } from "src/logs/entities/system-log.entity";
import { TelemetryRaw } from "src/telemetry/entities/telemetry-raw.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'exymc', name: 'poll_runs' })
export class PollRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'device_id' })
  deviceId: string;

  @ManyToOne(() => Device, (device) => device.pollRuns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({
    type: 'enum',
    enum: PollStatus,
    enumName: 'poll_status',
    default: PollStatus.RUNNING,
  })
  status: PollStatus;
  
  @Column({
    type: 'enum',
    enum: TriggerType,
    enumName: 'trigger_type',
    default: TriggerType.SCHEDULER,
  })
  trigger: TriggerType;

  @Column({ type: 'integer', name: 'total_request', default: 0 })
  totalRequest: number;

  @Column({ type: 'integer', name: 'success_count', default: 0 })
  successCount: number;

  @Column({ type: 'integer', name: 'fail_count', default: 0 })
  failCount: number;

  @Column({ type: 'timestamptz', name: 'started_at', default: () => 'now()' })
  startedAt: Date;

  @Column({ type: 'timestamptz', name: 'finished_at', nullable: true })
  finishedAt: Date | null;

  @Column({ type: 'text', name: 'error_message', nullable: true })
  errorMessage: string | null;

  @Column({ type: 'jsonb', name: 'connection_snapshot', nullable: true })
  connectionSnapshot: Record<string, any> | null;

  @OneToMany(() => TelemetryRaw, (telemetry) => telemetry.pollRun)
  telemetryRows: TelemetryRaw[];

  @OneToMany(() => SystemLog, (log) => log.pollRun)
  systemLogs: SystemLog[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}