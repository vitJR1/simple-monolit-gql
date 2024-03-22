import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.DB_SYNC === 'true',
  database: process.env.DB_DATABASE,
  logging: true,
  entities: ['src/**/entity/{*.js,*.ts}']
})