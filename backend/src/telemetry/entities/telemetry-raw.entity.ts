import { DeviceRegister } from "src/device/entities/device-register.entity";
import { PollRun } from "src/polling/entities/poll-run.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'exymc', name: 'telemetry_raw' })
export class TelemetryRaw {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  ts: Date;

  @Column({ type: 'bigint', name: 'device_register_id' })
  deviceRegisterId: string;

  @ManyToOne(() => DeviceRegister, (deviceRegister) => deviceRegister.telemetryRows, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'device_register_id' })
  deviceRegister: DeviceRegister;

  @Column({ type: 'uuid', name: 'poll_run_id', nullable: true })
  pollRunId: string | null;

  @ManyToOne(() => PollRun, (pollRun) => pollRun.telemetryRows, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'poll_run_id' })
  pollRun: PollRun | null;

  @Column({ type: 'double precision', name: 'value_num', nullable: true })
  valueNum: number | null;
}