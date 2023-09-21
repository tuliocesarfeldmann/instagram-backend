import { type User } from '../models/user.model'
import { UserDAO } from '../dao/user.dao'
import { type OkPacket } from 'mysql'

export class UserService {
  readonly userDAO: UserDAO

  constructor () {
    this.userDAO = new UserDAO()
  }

  public async createUser (user: User): Promise<boolean> {
    return await this.userDAO.createUser(user).then((resp: OkPacket) => resp.affectedRows > 0)
  }
}
