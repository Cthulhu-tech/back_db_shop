import { Response, Request, NextFunction } from "express";

export interface IJwtUtils {
    checkBearer(req: Request, res: Response, next: NextFunction)
}

export type BearerType = { 
    userId: number
    iat: number
    exp: number 
}