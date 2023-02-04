import { Request, Response } from 'express'

export interface IUser {
    getInfo(req: Request, res: Response): void
    create(req: Request, res: Response): void
    delete(req: Request, res: Response): void
    update(req: Request, res: Response): void
}


export type LoginBody = {
    firstName: string,
    lastName?: string,
    phone?: string,
    email: string,
    city?: string,
    password: string,
    img?: string,
}
