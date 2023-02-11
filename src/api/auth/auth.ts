import { IAuth, LoginType, LogoutType } from './type'
import { AppDataSource } from '../../data-source'
import { sign, verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { Users } from '../../entity/users'
import jwt_decode from 'jwt-decode'
import bcrypt from 'bcrypt'

export class Auth implements IAuth {

    tokenRequired: string
    serverError: string
    notFoundMessage: string

    constructor() {

        this.tokenRequired = "Token is required"
        this.serverError = "Error, the server does not understand"
        this.notFoundMessage = "Please enter a valid email or password"
    }

    login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body as LoginType

            if(!email || !password) res.status(401).end({error:this.notFoundMessage})

            if(!email.trim() || !password.trim()) res.status(401).end({error:this.notFoundMessage})
    
            const user = await AppDataSource.createQueryBuilder().select("users").from(Users, "users").where("users.email = :email", { email }).getOne()
            
            if(!user) return res.status(401).end({error:this.notFoundMessage})

            const match = await bcrypt.compare(password, user.password)
    
            if(!match) return res.status(401).end({error: this.notFoundMessage})
    
            const accessToken = this.createAccessToken(user.id, '15m')
            const refreshToken = this.createRefreshToken(user.id, '7d')

            await AppDataSource.createQueryBuilder().update(Users).set({ token: refreshToken }).where("id = :id", { id: user.id }).execute()

            await this.sendRefreshToken(res, refreshToken)
            await this.sendAccessToken(res, accessToken)

        }catch (err) {

            return res.status(500).send({ error: this.serverError })
        }
    }

    async logout(req: Request, res: Response) {

        try {

            const token = req?.cookies?.refresh_token

            if(!token) return res.status(403).send({ error: this.tokenRequired })
    
            const { userId } = await jwt_decode(token) as LogoutType
    
            await AppDataSource.createQueryBuilder().update(Users).set({ token: null }).where("id = :id and token = :token", { id: userId, token }).execute()
    
            return res.clearCookie('refresh_token', { path: '/' }).status(201).send({ message: 'Refresh token successfully deleted' })

        }catch (err) {

            return res.status(500).json({error: this.serverError})
        }
    }

    refresh = async (req: Request, res: Response) => {

        const token: string | undefined = req?.cookies?.refresh_token

        if(!token) return res.status(403).send({ error: this.tokenRequired })

        let payload = null

        try {

            payload = await verify(token, process.env.SECRET_JWT_REFRESH_KEY)

            const user = await AppDataSource.getRepository(Users).createQueryBuilder("users").where("users.id = :userId", { userId: payload.userId }).andWhere('users.token = :token', {token}).getOne()

            if(!user || user.token !== token) return res.status(403).send({ error: this.tokenRequired })

            const accessToken = await this.createAccessToken(payload.userId, '15m')
            const refreshToken = await this.createRefreshToken(payload.userId, '7d')

            await this.sendRefreshToken(res, refreshToken)
            await this.sendAccessToken(res, accessToken)

            await AppDataSource.createQueryBuilder().update(Users).set({ token: refreshToken }).where("id = :id", { id: payload.userId }).andWhere("token = :token", {token}).execute()

        }catch (err) {
            console.log(err)
            return res.status(500).send({ error: this.serverError })
        }
    }

    private createAccessToken = (userId: number, time: string) => sign({ userId }, process.env.SECRET_JWT_ACCESS_KEY, { expiresIn: time,})

    private createRefreshToken = (userId: number, time: string) => sign({ userId }, (process.env.SECRET_JWT_REFRESH_KEY), {expiresIn: time,});

    private sendRefreshToken = async (res: Response, token: string) => await res.cookie('refresh_token', token, {sameSite: 'lax', httpOnly: true, path: '/', expires: new Date(Date.now() + 432000000)})

    private sendAccessToken = async (res: Response, accesstoken) => await res.status(201).send({accesstoken})

}