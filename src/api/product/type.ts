import { Request, Response } from 'express'

export interface IProduct {
    getProductById(req: Request, res: Response): void
    delayedResponse(req: Request, res: Response): void
    delayed(req: Request, res: Response): void
    update(req: Request, res: Response): void
    delete(req: Request, res: Response): void
    cretate(req: Request, res: Response): void
    getProduct(req: Request, res: Response): void
    getProductInUser(req: Request, res: Response): void
}

export type Pagenation = {
    page: string
    size: string
}