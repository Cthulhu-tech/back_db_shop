import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Product } from "./product"

@Entity()
export class Photo {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Product, (product) => product.photo)
    product: Product

    @Column('varchar', { length: 535 })
    description: string

    @Column('char', { length: 255 })
    path: string

}
