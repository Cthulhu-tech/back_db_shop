import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Purchase } from "./purchase"
import { Product } from "./product"
import { Delayed } from './delayed'
import { Message } from './message'
import { Room } from './room'

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Product, (product) => product.user)
    product: Product[]

    @OneToMany(() => Purchase, (purchase) => purchase.user)
    purchase: Purchase[]

    @OneToMany(() => Delayed, (delayed) => delayed.user, { nullable: true })
    delayed: Delayed[]

    @OneToMany(() => Message, (message) => message.user, { nullable: true })
    message: Message[]

    @OneToMany(() => Room, (room) => room.user, { nullable: true })
    room: Room[]

    @Column('char', { length: 55 })
    firstName: string

    @Column('char', { length: 55, nullable: true })
    lastName: string

    @Column('char', { length: 20, nullable: true })
    phone: string

    @Column('char', { length: 255 })
    email: string

    @Column('char', { length: 255, nullable: true })
    city: string

    @Column('char', { length: 255 })
    password: string

    @Column('char', { length: 255, nullable: true })
    img: string

    @Column('boolean')
    verification: boolean

    @Column('char', { length: 255, nullable: true })
    token: string

}
