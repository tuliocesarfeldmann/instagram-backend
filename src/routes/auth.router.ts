import { Router } from 'express'
import { AuthControler } from '../constrollers/auth.controler'

export class AuthRouter {
  readonly router: Router = Router()
  readonly authControler: AuthControler

  constructor () {
    this.authControler = new AuthControler()
  }

  public initializeRoutes (): Router {
    this.router
      .route('/authenticate')
      .post(this.authControler.generateToken)

    return this.router
  }
}
