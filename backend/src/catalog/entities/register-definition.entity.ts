import { DataType } from "src/common/enum";
import { Column, CreateDateColumn, DataTypeNotSupportedError, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ModelRegister } from "./model-register.entity";

@Entity({ schema: 'exymc', name: 'register_definitions' })
export class RegisterDefinition {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  label: string;

  @Column({ type: 'text', nullable: true })
  unit: string | null;

  @Column({
    type: 'enum',
    enum: DataTypeNotSupportedError,
    enumName: 'data_type',
  })
  dataType: DataType;

  @OneToMany(() => ModelRegister, (modelRegister) => modelRegister.registerDefinition)
  modelRegisters: ModelRegister[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}