import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./product"

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Product, (product) => product.user)
    product: Product[]

    @Column('char', { length: 55 })
    firstName: string

    @Column('char', { length: 55 })
    lastName: string

    @Column('char', { length: 20 })
    phone: string

    @Column('char', { length: 255 })
    email: string

    @Column('char', { length: 255 })
    city: string

    @Column('char', { length: 255 })
    password: string

    @Column('char', { length: 255 })
    img: string

    @Column('boolean')
    verification: boolean

}
