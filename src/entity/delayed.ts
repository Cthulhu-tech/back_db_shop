import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Product } from './product'
import { User } from './user'

@Entity()
export class Delayed {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Product, (product) => product.delayed)
    product: Product

    @ManyToOne(() => User, (user) => user.delayed)
    user: User

}
