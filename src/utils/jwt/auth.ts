import { Request, Response } from 'express'
import { verify }  from 'jsonwebtoken'
import { BearerType } from './type'

export const ChechAuthorization = (req: Request, res: Response) => {
  
    try{

      const authorization = req.headers['authorization']
      
      if (!authorization) throw new Error()

      const token = authorization.split(' ')[1]

      const { userId, iat, exp } = verify(token, process.env.SECRET_JWT_ACCESS_KEY) as BearerType

      req.query.token = [userId.toString(), iat.toString(), exp.toString()]

      return true

    }catch(error){

      return false
    }
}
