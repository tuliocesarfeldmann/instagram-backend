import * as jwt from 'jsonwebtoken'
import { VerifyOptions, JsonWebTokenError } from 'jsonwebtoken'
import { Token } from '../models/token.model'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export class AuthMiddleware {

    private secretKey = process.env.TOKEN_SECRET ?? ''

    public generateToken () {
        const payload = {
            name: 'Andrés Reales',
            userId: 123,
            accessTypes: [
            'get',
            'add',
            'update',
            'delete'
            ]
        }

        const signInOptions: jwt.SignOptions = {
            // RS256 uses a public/private key pair. The API provides the private key 
            // to generate the JWT. The client gets a public key to validate the 
            // signature
            algorithm: 'HS256',
            expiresIn: '1m'
        }


        return jwt.sign(payload, this.secretKey, signInOptions)
    }

    public authorize(allowedAccessTypes: string[]): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let jwt = req.headers.authorization

                if (!jwt) {
                    return res.status(401).json({ reason: 'Invalid token' })
                }

                if (jwt.toLowerCase().startsWith('bearer')) {
                    jwt = jwt.slice('bearer'.length).trim()
                }

                const decodedToken = await this.validateToken(jwt)
            
                const hasAccessToEndpoint = allowedAccessTypes.some(
                    (at) => decodedToken.accessTypes.some((uat) => uat === at)
                )
            
                if (!hasAccessToEndpoint) {
                    return res.status(401).json({ reason: 'No enough privileges to access endpoint' })
                }
            
                next()
            } catch (error: any) {
                if(error instanceof JsonWebTokenError) {
                    res.status(401).json({ reason: error.message })
                } else {
                    res.status(500).json({ message: 'Failed to authenticate user' })
                }
            }
        }
    }

    public validateToken(token: string): Promise<Token> {
        const verifyOptions: VerifyOptions = {
            algorithms: ['HS256'],
        }

        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, verifyOptions, (error: Error | unknown, decoded: string | unknown) => {
                console.log(decoded)
                if (error) {
                    reject(error)
                } 
                if (decoded) {
                    resolve(decoded as Token)
                }
            })
        })
    }

}