import { AppDataSource } from '../../data-source'
import { Request, Response } from 'express'
import { Users } from '../../entity/users'
import { ErrorData } from '../error/error'
import { IUser, LoginBody } from './type'
import bcrypt from 'bcrypt' 

export class User extends ErrorData implements IUser {
    constructor() {
        super()
    }

    getInfo = async(req: Request, res: Response) => {

        try {

            const user = await AppDataSource.getRepository(Users).createQueryBuilder("users").where("users.id = :id", { id: req.params.id }).getOne()

            return res.status(200).send({city: user.city ?? null, email: user.email, name: user.firstName, surname: user.lastName ?? null, phone: user.phone ?? null, img: user.img ?? null })

        }catch (err) {

            return res.status(404).send({error: 'Not Found'})
        }
    }

    create = async(req: Request, res: Response) => {
        
        const { firstName, lastName, phone, email, city, password, img } = req.body as LoginBody

        if(!firstName || !email || !password) return res.status(400).send({error: 'Invalid name or password or invalid email'})

        if (!firstName?.trim() || !email?.trim() || !password?.trim()) return res.status(400).send({error: 'Invalid name or password or invalid email'})

        const user = await AppDataSource.getRepository(Users).createQueryBuilder("users").where("users.email = :email", { email }).getOne()

        if(user) return res.status(400).send({error: "User already exists"})

        const hashPassword = await bcrypt.hash(password, 10)

        await AppDataSource.createQueryBuilder().insert().into(Users).values([{ firstName, lastName, phone, email, city, password: hashPassword, img }]).execute()

        return res.status(201).send({ message: 'User created successfully'})
    }

    delete = async (req: Request, res: Response) => {

        try {

            const { password } = req.body

            if (!password?.trim()) return res.status(400).send({error: 'Invalid password'})

            const user = await AppDataSource.createQueryBuilder().select("users").from(Users, "users").where("users.id = :userId", { userId: req.query.token[0] }).getOne()
            
            if(!user) return res.status(401).end({error: 'Invalid password'})

            const match = await bcrypt.compare(password, user.password)

            if(!match) return res.status(401).end({error: 'Invalid password'})

            AppDataSource.getRepository(Users).createQueryBuilder().update().set({ active: false }).where("id = :userId", { userId: req.query.token[0] }).execute()

            return res.status(204).send({ message: 'User update successfully'})

        }catch (err) {

            res.status(500).send({error: this.serverError})
        }
    }

    update = async (req: Request, res: Response) => {

        try {

            const { name, surname, phone, email, city } = req.body

            if (!name?.trim() || !email?.trim()) return res.status(400).send({error: 'Invalid name or password or invalid email'})

            AppDataSource.getRepository(Users).createQueryBuilder().update().set({ firstName: name, lastName: surname, phone, email, city }).where(`id = :userId`, { userId: req.query.token[0] }).execute()

            return res.status(202).send({ message: 'User update successfully'})

        }catch(err){

            res.status(500).send({error: this.serverError})
        }
    }

}