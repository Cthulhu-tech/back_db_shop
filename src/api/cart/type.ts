import { Request, Response } from "express"

export interface ICart {
    getCart(req: Request, res: Response):void
    update(req: Request, res: Response):void
}