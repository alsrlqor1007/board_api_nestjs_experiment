import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  entities: ['dist/entities/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
