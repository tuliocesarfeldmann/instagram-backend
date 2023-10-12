import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/entity/user.entity"
import { Permission } from "./models/entity/permission.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "#A1b2c3d4e5f6#",
    database: "instagram",
    synchronize: true,
    logging: false,
    entities: [User, Permission],
    migrations: [],
    subscribers: []
})
