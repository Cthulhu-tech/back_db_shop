import { Entity, PrimaryGeneratedColumn, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm'
import { Product } from './product'

@Entity()
@Tree("materialized-path")
export class Category {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Product, (product) => product.category)
    product: Product

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

}
