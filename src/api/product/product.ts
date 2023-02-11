import { AppDataSource } from '../../data-source'
import { Products } from '../../entity/product'
import { Delayed } from '../../entity/delayed'
import { Request, Response } from 'express'
import { Photo } from '../../entity/photo'
import ImageDataURI from 'image-data-uri'
import { sign } from 'jsonwebtoken'
import { IProduct } from "./type"

export class Product implements IProduct {
    constructor() {

    }
    
    update(req: Request, res: Response) {

    }

    delete(req: Request, res: Response){

    }

    delayed = async (req: Request, res: Response) => {

        const { product } = req.body

        if(!product) return res.status(400).send({ error: 'Fill in all the fields'}) 

        await AppDataSource.createQueryBuilder().insert().into(Delayed).values({ product, user: req.query.token[0]}).execute()
    }

    cretate = async (req: Request, res: Response) => {

        const { description, title, city, price , street, delivery, categoryId } = req.body
        if(!description && !title && !city) return res.status(400).send({ error: 'Fill in all the fields'})
        const insert = await AppDataSource.createQueryBuilder().insert().into(Products).values([{ description, title, city, price: isNaN(price) ? null : price, street: isNaN(street) ? null : street, delivery: isNaN(delivery) ? null : delivery, category: typeof(categoryId) === 'string' ? null : categoryId, user: req.query.token[0]}]).execute()

        for(let i = 0; i < req.body.images.length; i++){
            const path = await sign({ userId: req.query.token[0]}, process.env.SECRET_JWT_ACCESS_KEY)
            await AppDataSource.createQueryBuilder().insert().into(Photo).values([{ description: description ?? '', path: path + '.png', product: insert.raw.insertId}]).execute()
            ImageDataURI.outputFile(req.body.images[i].dataURL, __dirname + `/../../../public/${path}.png`)
        }

        res.status(201).send({message: 'Product signed successfully'})
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