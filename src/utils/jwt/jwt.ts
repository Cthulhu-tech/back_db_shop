import { Request, Response, NextFunction } from 'express'
import { IJwtUtils } from './type'

export class JwtUtils implements IJwtUtils {
    
    constructor() {
        
    }

    checkBearer(req: Request, res: Response, next: NextFunction) {
        
    }

    checkCookie(req: Request, res: Response, next: NextFunction) {
        next()
    }

}