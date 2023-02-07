import { Request, Response } from 'express'

export interface ICategory {
    getAllCategory(req: Request, res: Response): void
}