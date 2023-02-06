import { Entity, PrimaryGeneratedColumn, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm'
import { Products } from './product'

@Entity()
@Tree("materialized-path")
export class Category {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToMany(() => Products, (product) => product.category)
    product: Products

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

}
