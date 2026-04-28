import { Device } from "src/device/entities/device.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ModelRegister } from "./model-register.entity";

@Entity({ schema: 'exymc', name: 'models' })
export class Model {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text', unique: true })
  name: string

  @OneToMany(() => Device, (device) => device.model)
  devices: Device[];

  @OneToMany(() => ModelRegister, (modelRegister) => modelRegister.model)
  modelRegisters: ModelRegister[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}