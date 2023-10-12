import { type User } from '../models/user.model'
import { UserDAO } from '../dao/user.dao'
import { type OkPacket } from 'mysql'
import * as bc from 'bcrypt'

export class UserService {
  readonly userDAO: UserDAO

  constructor () {
    this.userDAO = new UserDAO()
  }

  public async createUser (user: User): Promise<boolean> {
    user.password = await bc.hash(user.password, 10)

    return await this.userDAO.createUser(user).then((resp: OkPacket) => resp.affectedRows > 0)
  }
}
