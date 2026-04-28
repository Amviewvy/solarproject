import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Model } from './model.entity';
import { RegisterDefinition } from './register-definition.entity';
import { ByteOrderNew, FunctionCode } from 'src/common/enum';
import { DeviceRegister } from 'src/device/entities/device-register.entity';

@Index('uq_model_register', ['modelId', 'registerDefinitionId', 'address', 'functionCode'], {
  unique: true,
})
@Entity({ schema: 'exymc', name: 'model_registers' })
export class ModelRegister {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'bigint', name: 'model_id' })
  modelId: string;

  @ManyToOne(() => Model, (model) => model.modelRegisters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @Column({ type: 'bigint', name: 'register_definition_id' })
  registerDefinitionId: string;

  @ManyToOne(() => RegisterDefinition, (registerDefinition) => registerDefinition.modelRegisters, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'register_definition_id' })
  registerDefinition: RegisterDefinition;

  @Column({ type: 'integer' })
  address: number;

  @Column({
    type: 'enum',
    name: 'function_code',
    enum: FunctionCode,
    enumName: 'function_code',
  })
  functionCode: FunctionCode;

  @Column({
    type: 'enum',
    name: 'byte_order',
    enum: ByteOrderNew,
    enumName: 'byte_order_new',
    nullable: true,
  })
  byteOrder: ByteOrderNew | null;

  @Column({ type: 'numeric', precision: 18, scale: 6, default: 1 })
  scale: string;

  @Column({ type: 'boolean', name: 'is_enabled', default: true })
  isEnabled: boolean;

  @OneToMany(() => DeviceRegister, (deviceRegister) => deviceRegister.modelRegister)
  deviceRegisters: DeviceRegister[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
