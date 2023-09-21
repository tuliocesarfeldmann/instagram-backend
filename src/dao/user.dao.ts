import { type OkPacket } from 'mysql'
import { DataBase } from '../config/db.config'
import { type User } from '../models/user.model'

export class UserDAO {
  readonly db: DataBase

  constructor () {
    this.db = new DataBase()
  }

  public async createUser (user: User): Promise<OkPacket> {
    return await this.db.execute(`
            INSERT INTO USER (NAME, ROLE_ID)
            VALUES (?, ?)
        `, [ user.name, user.roles ]
    )
  }
}
