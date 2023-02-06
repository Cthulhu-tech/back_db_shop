import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Products } from './product'
import { Users } from './users'

@Entity()
export class Delayed {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Products, (product) => product.delayed)
    product: Products

    @ManyToOne(() => Users, (user) => user.delayed)
    user: Users

}
