import { Request, Response } from "express"
import { ErrorData } from "../error/error"
import { ICart } from "./type"

export class Cart extends ErrorData implements ICart {
    
    constructor() {
        super()
    }

    getCart = async(req: Request, res: Response) => {

    }

    update = async(req: Request, res: Response) => {

    }
}