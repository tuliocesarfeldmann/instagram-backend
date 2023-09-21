import { UserService } from '../service/user.service'
import { NextFunction, Request, Response } from 'express'

export class UserControler {
  readonly userService: UserService

  constructor () {
    this.userService = new UserService()
  }

  public createUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.createUser(req.body)
      .then(result => res.status(201).send({ success: result }))
      .catch(err => { next(err) })
  }
}
