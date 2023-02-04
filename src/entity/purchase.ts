import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from './product'
import { Users } from './users'

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('timestamp')
    sale_time: number

    @ManyToOne(() => Users, (user) => user.purchase, { nullable: true })
    user: Users

    @OneToMany(() => Product, (product) => product.purchase, { nullable: true })
    product: Product

}
