import { Request, Response, NextFunction } from 'express'
import { ChechAuthorization } from './auth'
import { IJwtUtils } from './type'

export class JwtUtils implements IJwtUtils {
    
    constructor() {
        
    }

    checkBearer(req: Request, res: Response, next: NextFunction) {
        if(ChechAuthorization(req, res))
            next()
        else
            res.status(403).send({ error: 'Need authorization'})
    }

}