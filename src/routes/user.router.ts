import { Router } from 'express'
import { UserControler } from '../constrollers/user.controler'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { Role } from '../enum/role.enum'

export class UserRouter {
  readonly router: Router = Router()
  readonly auth: AuthMiddleware
  readonly userController: UserControler

  constructor () {
    this.userController = new UserControler()
    this.auth = new AuthMiddleware()
  }

  public initializeRoutes (): Router {
    this.router
      .route('/')
      .post(this.auth.authorize({ role: Role.USER, method: 'POST' }), this.userController.createUser)

    return this.router
  }
}
