import { AppDataSource } from '../../data-source'
import { Category } from '../../entity/category'
import { Request, Response } from 'express'
import { ICategory } from './type'

export class Categories implements ICategory {

    constructor(){}

    async getAllCategory(req: Request, res: Response) {

        const category = await AppDataSource.getRepository(Category).createQueryBuilder("category").select('*').getRawMany()
        
        return res.status(200).send({ category })
    }

}