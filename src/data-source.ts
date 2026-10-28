import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Task } from './tasks/task.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  migrations: [`${import.meta.dirname}/migrations/*.js`],
  synchronize: false,
});
