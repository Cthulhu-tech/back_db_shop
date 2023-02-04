import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Column } from 'typeorm'
import { User } from './user'
import { Room } from './room'

@Entity()
export class Message {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 535, nullable: true })
    message: string

    @ManyToOne(() => User, (user) => user.message)
    user: User

    @ManyToOne(() => Room, (room) => room.message)
    room: Room

}
