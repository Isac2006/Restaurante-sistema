import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database', 'database.db')
    },
    pool: {
      // Habilita as Foreign Keys no SQLite corretamente
      afterCreate: (conn: any, done: any) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'database', 'migrations')
    },
    seeds: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'database', 'seeds')
    }
  }
};