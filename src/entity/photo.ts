import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Products } from "./product"

@Entity()
export class Photo {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne((type) => Products, (product) => product.photos)
    product: Products

    @Column('varchar', { length: 535, nullable: true })
    description: string

    @Column('char', { length: 255 })
    path: string

}
