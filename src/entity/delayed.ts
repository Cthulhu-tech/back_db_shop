import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Product } from './product'
import { Users } from './users'

@Entity()
export class Delayed {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Product, (product) => product.delayed)
    product: Product

    @ManyToOne(() => Users, (user) => user.delayed)
    user: Users

}
