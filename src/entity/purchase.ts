import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from './product'
import { User } from './user'

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('timestamp')
    sale_time: number

    @ManyToOne(() => User, (user) => user.purchase, { nullable: true })
    user: User

    @OneToMany(() => Product, (product) => product.purchase, { nullable: true })
    product: Product

}
