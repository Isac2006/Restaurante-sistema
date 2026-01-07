import path from 'path'
import { fileURLToPath } from 'url'
import type { Knex } from 'knex'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.db'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
}

export default config
