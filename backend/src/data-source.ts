import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { RefreshToken } from './auth/entities/refresh-token.entity';
import { User } from './users/entities/users.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    User,
    RefreshToken,
  ],
  migrations: ['src/migrations/*.ts'],
});
