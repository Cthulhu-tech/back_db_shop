import { NextFunction, Request, Response } from 'express'

export interface IAuth {
    login(req: Request, res: Response, jwtCheck: NextFunction): void
    logout(req: Request, res: Response, jwtCheck: NextFunction): void
    refresh(req: Request, res: Response, jwtCheck: NextFunction): void
}