import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Photo } from "./photo"
import { User } from "./user"

@Entity()
export class Product {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Photo, (photo) => photo.product)
    photo: Photo[]

    @ManyToOne(() => User, (user) => user.product)
    user: User

    @Column('char', { length: 55 })
    title: string

    @Column('varchar', { length: 535 })
    description: string

    @Column('char', { length: 255 })
    city: string

    @Column('char', { length: 255 })
    street: string

    @Column('boolean')
    delivery: boolean

}