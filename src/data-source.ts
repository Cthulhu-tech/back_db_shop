import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

import { Product } from "./entity/product"
import { Photo } from "./entity/photo"
import { User } from "./entity/user"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_ADDON_HOST,
    port: +process.env.MYSQL_ADDON_PORT,
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    synchronize: true,
    logging: true,
    entities: [User, Product, Photo],
    subscribers: [],
    migrations: [],
})