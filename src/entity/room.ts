import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm'
import { Message } from './message'
import { User } from './user'

@Entity()
export class Room {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 535, nullable: true })
    title: string

    @ManyToOne(() => User, (user) => user.delayed)
    user: User

    @OneToMany(() => Message, (message) => message.room)
    message: Message[]

}
