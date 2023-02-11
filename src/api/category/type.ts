import { Request, Response } from 'express'

export interface ICategory {
    getCategoryId(req: Request, res: Response): void
    getAllCategory(req: Request, res: Response): void
}