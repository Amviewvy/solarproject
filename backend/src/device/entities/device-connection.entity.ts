import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Device } from "./device.entity";
import { CommunicationEndpoint } from "./communication-endpoint.entity";

@Index('uq_device_connections_device_active', ['deviceId'], {
  unique: true,
  where: `"deleted_at" IS NULL`,
})
@Entity({ schema: 'exymc', name: 'device_connections' })
export class DeviceConnection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'device_id' })
  deviceId: string;

  @ManyToOne(() => Device, (device) => device.deviceConnections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ type: 'uuid', name: 'endpoint_id' })
  endpointId: string;

  @ManyToOne(() => CommunicationEndpoint, (endpoint) => endpoint.deviceConnections, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'endpoint_id' })
  endpoint: CommunicationEndpoint;

  @Column({ type: 'boolean', name: 'is_enabled', default: true })
  isEnabled: boolean;

  @Column({ type: 'integer', name: 'slave_id', nullable: true })
  slaveId: number | null;

  @Column({ type: 'integer', name: 'poll_interval', default: 5 })
  pollInterval: number;

  @Column({ type: 'integer', name: 'timeout_ms', default: 1000 })
  timeoutMs: number;

  @Column({ type: 'integer', name: 'retry_count', default: 3 })
  retryCount: number;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}