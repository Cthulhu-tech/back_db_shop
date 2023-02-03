import { Request, Response } from 'express'

export interface IProduct {
    update(req: Request, res: Response): void
    delete(req: Request, res: Response): void
    cretate(req: Request, res: Response): void
    getProduct(req: Request, res: Response): void
}