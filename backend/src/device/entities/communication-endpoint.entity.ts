import { ProtocolType } from "src/common/enum";
import { Check, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeviceConnection } from "./device-connection.entity";

@Index('uq_endpoint_rtu_active', ['serialPort'], {
  unique: true,
  where: `"protocol" = 'rtu' AND "serial_port" IS NOT NULL AND "deleted_at" IS NULL`,
})
@Index('uq_endpoint_tcp_active', ['ipAddress', 'port'], {
  unique: true,
  where: `"protocol" = 'tcp' AND "up_address" IS NOT NULL AND "port" IS NOT NULL AND "deleted_at" IS NULL`
})
@Check(`("protocol" <> 'rtu') OR ("serial_port" IS NOT NULL AND "baud_rate" IS NOT NULL)`)
@Check(`("protocol" <> 'tcp') OR ("ip_address" IS NOT NULL AND "port" IS NOT NULL)`)
@Entity({ schema: 'exymc', name: 'communication_endpoints' })
export class CommunicationEndpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProtocolType,
    enumName: 'protocol_type',
  })
  protocol: ProtocolType;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'boolean', name: 'is_enabled', default: true })
  isEnabled: boolean;

  @Column({ type: 'text', name: 'serial_port', nullable: true })
  serialPort: number | null;

  @Column({ type: 'integer', name: 'baud_rate', nullable: true })
  baudRate: number | null;

  @Column({ type: 'integer', name: 'date_bits', nullable: true })
  dataBits: number | null;

  @Column({ type: 'text', nullable: true })
  parity: string | null;

  @Column({ type: 'integer', name: 'stop_bits', nullable: true })
  stopBits: number | null;

  @Column({ type: 'inet', name: 'ip_address', nullable: true })
  ipAddress: string | null;

  @Column({ type: 'integer', nullable: true })
  port: number | null;

  @Column({ type: 'boolean', name: 'is_present', default: true })
  isPresent: boolean;

  @Column({ type: 'timestamptz', name: 'last_seen_at', nullable: true })
  lastSeenAt: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => DeviceConnection, (connection) => connection.endpoint)
  deviceConnections: DeviceConnection[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}