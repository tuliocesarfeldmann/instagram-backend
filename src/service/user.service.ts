import { User } from '../models/entity/user.entity'
import { UserDAO } from '../dao/user.dao'
import * as bc from 'bcrypt'

export class UserService {
  readonly userDAO: UserDAO

  constructor () {
    this.userDAO = new UserDAO()
  }

  public async createUser (user: User): Promise<User> {
    user.password = await bc.hash(user.password, 10)

    return await this.userDAO.createUser(user)
  }
}
