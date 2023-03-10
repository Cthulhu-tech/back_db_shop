import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

import { Purchase } from "./entity/purchase"
import { Category } from "./entity/category"
import { Products } from "./entity/product"
import { Delayed } from "./entity/delayed"
import { Message } from './entity/message'
import { Photo } from "./entity/photo"
import { Users } from "./entity/users"
import { Room } from "./entity/room"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_ADDON_HOST,
    port: +process.env.MYSQL_ADDON_PORT,
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    synchronize: true,
    logging: true,
    entities: [Users, Products, Photo, Category, Purchase, Delayed, Message, Room],
    subscribers: [],
    migrations: [],
})