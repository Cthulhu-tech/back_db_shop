import { AppDataSource } from '../../data-source'
import { Products } from '../../entity/product'
import { Delayed } from '../../entity/delayed'
import { Request, Response } from 'express'
import { Photo } from '../../entity/photo'
import { ErrorData } from '../error/error'
import ImageDataURI from 'image-data-uri'
import { sign } from 'jsonwebtoken'

import { IProduct, Pagenation } from './type'

export class Product extends ErrorData implements IProduct {

    constructor() {
        super()
    }
    
    update = async (req: Request, res: Response) => {
        try{

            
        }catch(err){
         
            res.status(500).send({error: this.serverError})
        }
    }

    delete = async (req: Request, res: Response) => {

        try{

            
        }catch(err){
         
            res.status(500).send({error: this.serverError})
        }
    }

    delayedResponse  = async (req: Request, res: Response) => {

        try {

            const delayed = await AppDataSource.createQueryBuilder(Delayed, 'delayed').where('delayed.userId = :userId', {userId: req.query.token[0]}).getRawMany()

            res.status(200).send({delayed})

        }catch (err) {

            res.status(500).send({error: this.serverError})
        }
    }

    delayed = async (req: Request, res: Response) => {

        try {

            const { product } = req.body

            if(!product) return res.status(400).send({ error: 'Fill in all the fields'})

            if(product.length <= 0) {

                await AppDataSource.createQueryBuilder().delete().from(Delayed).where("userId = :user", {user: req.query.token[0]}).execute()

                return res.status(201).send({message: 'Products delayed update'})
            }

            const productSearch = await AppDataSource.createQueryBuilder(Delayed, 'delayed').where('delayed.userId = :userId', {userId: req.query.token[0]}).getRawMany()

            const productParseId = productSearch.map(product => product.delayed_productId.toString())

            if(productParseId.length <= 0 && product.length > 0) await product.forEach(async (productId) => await AppDataSource.createQueryBuilder().insert().into(Delayed).values([{product: productId, user: req.query.token[0]}]).execute())
            else{

                const notTarget = productParseId.filter(element => product.includes(element))

                const insertElemenst = product.filter(element => !productParseId.includes(element))

                const deleteElements = productParseId.filter(element => !product.includes(element) && !notTarget.includes(element))

                deleteElements.length > 0 && deleteElements.map((productId) =>  AppDataSource.createQueryBuilder().delete().from(Delayed).where("productId = :productId and userId = :user", {productId, user: req.query.token[0]}).execute())

                insertElemenst.length > 0 && await insertElemenst.forEach(async (productId) => await AppDataSource.createQueryBuilder().insert().into(Delayed).values([{product: productId, user: req.query.token[0]}]).execute())
            }

            res.status(201).send({message: 'Product delayed successfully'})

        }catch(err){

            res.status(500).send({error: this.serverError})
        }
    }

    cretate = async (req: Request, res: Response) => {

        try {

            const { description, title, city, price , street, delivery, categoryId } = req.body

            console.log(req.body)

            if(!description && !title && !city) return res.status(400).send({ error: 'Fill in all the fields'})
    
            const insert = await AppDataSource.createQueryBuilder().insert().into(Products).values([{ description, title, city, price: isNaN(+price) ? null : price, street: isNaN(+street) ? street : null, delivery: isNaN(+delivery) ? null : delivery, category: isNaN(+categoryId) ? null : categoryId, user: req.query.token[0]}]).execute()
    
            for(let i = 0; i < req.body.images.length; i++){
    
                const path = await sign({ userId: req.query.token[0]}, process.env.SECRET_JWT_ACCESS_KEY)
    
                await AppDataSource.createQueryBuilder().insert().into(Photo).values([{ description: description ?? '', path: path + '.png', product: insert.raw.insertId}]).execute()
    
                ImageDataURI.outputFile(req.body.images[i].dataURL, __dirname + `/../../../public/${path}.png`)
            }
    
            res.status(201).send({message: 'Product signed successfully'})

        }catch(err) {

            res.status(500).send({error: this.serverError})
        }
    }

    getProductById = async (req: Request, res: Response) => {

        try{

            const { id } = req.params

            const product = await AppDataSource.getRepository(Products)
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.photos", "photo")
            .leftJoin("products.user", "user")
            .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.phone'])
            .leftJoinAndSelect("products.category", "category")
            .where("products.id = :id", { id }).getMany()

            if(product.length <= 0) return res.status(404).send({error: this.NotFound})

            res.status(200).send({...product})

        }catch(err) {
            console.log(err)
            res.status(500).send({error: this.serverError})
        }
    }

    getProduct = async (req: Request, res: Response) => {

        try{

            let { page, size } = req.query as Pagenation

            if (!page || isNaN(+page)) page = '1'
            if (!size || isNaN(+size)) size = '5'
    
            const limit = parseInt(size)

            const products = await AppDataSource.getRepository(Products)
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.photos", "photo")
            .leftJoin("products.user", "user")
            .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.phone'])
            .leftJoinAndSelect("products.category", "category")
            .take(limit).skip(limit * +page).where('products.active = 1')
            .orderBy('products.id').getMany()
            console.log(products)
            if(products.length <= 0) return res.status(404).send({error: this.NotFound})

            res.status(200).send({page: +page + +size, size, products})

        }catch (err) {

            res.status(500).send({error: this.serverError})
        }
    }

    getProductInUser = async (req: Request, res: Response) => {

        try{

            const token = req.query.token as string[]

            const products = await AppDataSource.getRepository(Products).createQueryBuilder("products").leftJoinAndSelect("products.photos", "photo").where("products.userId = :id", { id: token[0] }).getMany()
    
            res.status(200).send(products)
            
        }catch(err){

            res.status(500).send({error: this.serverError})
        }
    }
}