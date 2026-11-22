import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import type { DataSourceOptions } from 'typeorm';

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta configurar ${name}`);
  }

  return value;
}

export function databaseOptions(): DataSourceOptions {
  const port = Number(required('DB_PORT'));

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('DB_PORT debe ser un puerto válido');
  }

  return {
    type: 'postgres',
    host: required('DB_HOST'),
    port,
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),

    entities: [
      fileURLToPath(
        new URL('../**/*.entity.js', import.meta.url),
      ),
    ],

    migrations: [
      fileURLToPath(
        new URL('./migrations/*.js', import.meta.url),
      ),
    ],

    synchronize: false,
    migrationsRun: false,
  };
}