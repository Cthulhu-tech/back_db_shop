import { Request, Response } from 'express'

export interface IProduct {
    delayed(req: Request, res: Response): void
    update(req: Request, res: Response): void
    delete(req: Request, res: Response): void
    cretate(req: Request, res: Response): void
    getProduct(req: Request, res: Response): void
    getProductInUser(req: Request, res: Response): void
}