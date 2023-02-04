import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Purchase } from "./purchase"
import { Category } from "./category"
import { Delayed } from './delayed'
import { Photo } from "./photo"
import { User } from "./user"

@Entity()
export class Product {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Photo, (photo) => photo.product, { nullable: true })
    photo: Photo[]

    @ManyToOne(() => Category, (category) => category.product)
    category: Category

    @ManyToOne(() => User, (user) => user.product)
    user: User

    @ManyToOne(() => Purchase, (purchase) => purchase.product)
    purchase: Purchase

    @OneToMany(() => Delayed, (delayed) => delayed.product)
    delayed: Delayed[]

    @Column('char', { length: 55 })
    title: string

    @Column('varchar', { length: 535, nullable: true })
    description: string

    @Column('char', { length: 255 })
    city: string

    @Column('char', { length: 255, nullable: true })
    street: string

    @Column('boolean', { nullable: true })
    delivery: boolean

}
