import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Column } from 'typeorm'
import { Users } from './users'
import { Room } from './room'

@Entity()
export class Message {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 535, nullable: true })
    message: string

    @ManyToOne(() => Users, (user) => user.message)
    user: Users

    @ManyToOne(() => Room, (room) => room.message)
    room: Room

}
