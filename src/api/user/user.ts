import { AppDataSource } from '../../data-source'
import { Request, Response } from 'express'
import { Users } from '../../entity/users'
import { IUser, LoginBody } from './type'
import bcrypt from 'bcrypt' 

export class User implements IUser {
    constructor() {

    }

    getInfo(req: Request, res: Response) {

    }

    async create(req: Request, res: Response) {
        
        const { firstName, lastName, phone, email, city, password, img } = req.body as LoginBody

        if(!firstName || !email || !password) return res.status(400).send({error: 'Invalid name or password or invalid email'})

        if (!firstName.trim() || !email.trim() || !password.trim()) return res.status(400).send({error: 'Invalid name or password or invalid email'})

        const user = await AppDataSource.getRepository(Users).createQueryBuilder("users").where("users.email = :email", { email }).getOne()

        if(user) return res.status(400).send({error: "User already exists"})

        const hashPassword = await bcrypt.hash(password, 10)

        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([{ firstName, lastName, phone, email, city, password: hashPassword, img }])
        .execute()

        return res.status(201).send({ message: 'User created successfully'})
    }

    delete(req: Request, res: Response) {

    }

    update(req: Request, res: Response) {

    }

}