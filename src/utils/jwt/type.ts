import { Response, Request, NextFunction } from "express";

export interface IJwtUtils {
    checkBearer(req: Request, res: Response, next: NextFunction)
    checkCookie(req: Request, res: Response, next: NextFunction)
}