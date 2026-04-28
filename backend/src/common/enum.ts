import { Role } from 'src/users/enums/role.enum';

export enum DeviceType {
  METER = 'meter',
  SENSOR = 'sensor',
  PLC = 'plc',
  INVERTER = 'inverter',
}

export enum ProtocolType {
  RTU = 'rtu',
  TCP = 'tcp',
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum PollStatus {
  RUNNING = 'running',
  SUCCESS = 'success',
  PARTIAL = 'partial',
  FAILED = 'failed',
}

export enum TriggerType {
  SCHEDULER = 'scheduler',
  MANUAL = 'manual',
  STARTUP = 'startup',
  RETRY = 'retry',
}

export enum FunctionCode {
  READ_COILS = '1',
  READ_DISCRETE_INPUTS = '2',
  READ_HOLDING_REGISTERS = '3',
  READ_INPUT_REGISTERS = '4',
}

export enum ByteOrderNew {
  BIG_ENDIAN = 'big_endian',
  LITTLE_ENDIAN = 'little_endian',
  BIG_ENDIAN_BYTE_SWAP = 'big_endian_byte_swap',
  LITTLE_ENDIAN_BYTE_SWAP = 'little_endian_byte_swap',
}

export enum DataType {
  INT16 = 'int16',
  UINT16 = 'uint16',
  INT32 = 'int32',
  UINT32 = 'uint32',
  INT64 = 'int64',
  UINT64 = 'uint64',
  FLOAT32 = 'float32',
  FLOAT64 = 'float64',
  BOOL = 'bool',
  STRING = 'string',
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
