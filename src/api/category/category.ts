import { AppDataSource } from '../../data-source'
import { Category } from '../../entity/category'
import { Request, Response } from 'express'
import { ErrorData } from '../error/error'
import { ICategory } from './type'

export class Categories extends ErrorData implements ICategory {

    constructor(){
        super()
    }

    getCategoryId = async(req: Request, res: Response) => {

        try{

            const { categoryId } = req.body

            if(!categoryId) return res.status(400).send({ error: 'Fill in all the fields'})
    
            const category = await AppDataSource.getRepository(Category).createQueryBuilder("category").where('category.id = :caregoryId', {categoryId}).getRawMany()
            
            return res.status(200).send({ category })

        }catch(err) {

            res.status(500).send({error: this.serverError})
        }
    }

    getAllCategory = async(req: Request, res: Response) => {

        const category = await AppDataSource.getRepository(Category).createQueryBuilder("category").getRawMany()

        return res.status(200).send({ category })
    }

}