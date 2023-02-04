import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm'
import { Message } from './message'
import { Users } from './users'

@Entity()
export class Room {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 535, nullable: true })
    title: string

    @ManyToOne(() => Users, (user) => user.delayed)
    user: Users

    @OneToMany(() => Message, (message) => message.room)
    message: Message[]

}
