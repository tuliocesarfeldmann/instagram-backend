import { type OkPacket } from 'mysql'
import { DataBase } from '../config/db.config'
import { type User } from '../models/user.model'

export class UserDAO {
  readonly db: DataBase

  constructor () {
    this.db = new DataBase()
  }

  public async createUser (user: User): Promise<OkPacket> {
    return await new Promise((resolve, reject) => {
      this.db.pool.getConnection((err, connection) => {
        if (err !== null) {
          throw err
        }
        connection.beginTransaction()

        connection.query(`
              INSERT INTO USER (FIRST_NAME, LAST_NAME, CITY, STATE, COUNTRY, EMAIL, PASSWORD, ROLE_ID)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
          user.firstName,
          user.lastName,
          user.city,
          user.state,
          user.country,
          user.email,
          user.password,
          user.role
        ], (err, result: OkPacket) => {
          if (err !== null) {
            connection.rollback()
            reject(err)
            return
          }

          user.id = result.insertId

          connection.query(`
                INSERT INTO PERMISSIONS (USER_ID, \`CREATE\`, \`READ\`, \`UPDATE\`, \`DELETE\`)
                VALUES (?, ?, ?, ?, ?)
              `, [
            user.id,
            user.permission.create,
            user.permission.read,
            user.permission.update,
            user.permission.delete
          ], (err, result) => {
            if (err !== null) {
              connection.rollback()
              reject(err)
              return
            }

            connection.commit()
            connection.release()
            resolve(result)
          })
        })
      })
    })
  }
}
