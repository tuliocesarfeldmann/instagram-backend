import { UserService } from '../service/user.service'
import { type NextFunction, type Request, type Response } from 'express'

export class UserControler {
  readonly userService: UserService

  constructor () {
    this.userService = new UserService()
  }

  public createUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.createUser(req.body)
      .then( _ => res.status(201).send({ success: true }))
      .catch(err => {
        next(err)
      })
  }
}
