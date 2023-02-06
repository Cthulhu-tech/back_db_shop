import { AppDataSource } from '../../data-source'
import { Products } from '../../entity/product'
import { Request, Response } from 'express'
import { IProduct } from "./type"

export class Product implements IProduct {
    constructor() {

    }
    
    update(req: Request, res: Response) {

    }

    delete(req: Request, res: Response){

    }

    cretate(req: Request, res: Response){

    }

    getProduct(req: Request, res: Response){

    }

    async getProductInUser(req: Request, res: Response){

        const token = req.query.token as string[]

        const products = await AppDataSource.getRepository(Products)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.photos", "photo")
        .where("products.userId = :id", { id: token[0] })
        .getMany()

        res.status(200).send(products)

    }
}