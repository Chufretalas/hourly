import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*.js"],
    synchronize: false,
}
const dataSource = new DataSource(dataSourceOptions)

export default dataSource