import { LogLevel } from "src/common/enum";
import { Device } from "src/device/entities/device.entity";
import { PollRun } from "src/polling/entities/poll-run.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'exymc', name: 'system_logs' })
export class SystemLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  ts: Date;

  @Column({
    type: 'enum',
    enum: LogLevel,
    enumName: 'log_level',
    default: LogLevel.INFO,
  })
  level: LogLevel;

  @Column({ type: 'text', nullable: true })
  source: string | null;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  detail: Record<string, any> | null;

  @Column({ type: 'uuid', name: 'device_id', nullable: true })
  deviceId: string | null;

  @ManyToOne(() => Device, (device) => device.systemLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device | null;

  @Column({ type: 'uuid', name: 'poll_run_id', nullable: true })
  pollRunId: string | null;

  @ManyToOne(() => PollRun, (pollRun) => pollRun.systemLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'poll_run_id' })
  pollRun: PollRun | null;
}