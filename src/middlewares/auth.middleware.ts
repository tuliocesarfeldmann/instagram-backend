import * as jwt from 'jsonwebtoken'
import { type VerifyOptions, JsonWebTokenError } from 'jsonwebtoken'
import { type Token } from '../models/token.model'
import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { CustomError } from '../models/customError.model'
import { Role } from '../enum/role.enum'

export class AuthMiddleware {
  readonly secretKey = process.env.TOKEN_SECRET ?? ''

  public generateToken (): string {
    const payload = {
      name: 'Andrés Reales',
      userId: 123,
      accessTypes: [
        'GET',
        'POST',
        'UPDATE',
        'DELETE'
      ],
      role: Role.USER
    }

    const signInOptions: jwt.SignOptions = {
      // RS256 uses a public/private key pair. The API provides the private key
      // to generate the JWT. The client gets a public key to validate the
      // signature
      algorithm: 'HS256',
      expiresIn: '30m'
    }

    return jwt.sign(payload, this.secretKey, signInOptions)
  }

  public authorize (allowedAccessTypes: { role: Role, method: string }): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        let jwt = req.headers.authorization

        if (jwt === null || jwt === undefined) {
          next(new CustomError(401, 'Invalid token.'))
          return
        }

        if (jwt.toLowerCase().startsWith('bearer')) {
          jwt = jwt.slice('Bearer'.length).trim()
        }

        const decodedToken = this.validateToken(jwt)

        const hasRoleAccessToEndpoint = allowedAccessTypes.role === decodedToken.role
        const hasMethodAccessToEndpoint = decodedToken.accessTypes.some((uat) => uat === allowedAccessTypes.method)

        if (!hasRoleAccessToEndpoint || !hasMethodAccessToEndpoint) {
          next(new CustomError(403, 'No enough privileges to access endpoint.'))
        }

        next()
      } catch (error: any) {
        if (error instanceof JsonWebTokenError) {
          next(new CustomError(401, error.message))
        } else {
          next(new CustomError(500, 'Failed to authenticate user.'))
        }
      }
    }
  }

  public validateToken (token: string): Token {
    const verifyOptions: VerifyOptions = {
      algorithms: ['HS256']
    }

    return jwt.verify(token, this.secretKey, verifyOptions) as Token
  }
}
