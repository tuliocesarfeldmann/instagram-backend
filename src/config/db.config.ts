import { DataSource } from "typeorm"
import { User } from '../models/entity/user.entity'
import { Permission } from '../models/entity/permission.entity'
import * as dotenv from 'dotenv'

dotenv.config()

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Permission],
    migrations: [],
    subscribers: []
})
