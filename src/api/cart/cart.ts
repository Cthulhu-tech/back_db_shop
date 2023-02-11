import { Request, Response } from "express"
import { ErrorData } from "../error/error"
import { ICart } from "./type"

export class Cart extends ErrorData implements ICart {
    
    constructor() {
        super()
    }

    getCart(req: Request, res: Response) {

    }

    update(req: Request, res: Response) {

    }
}