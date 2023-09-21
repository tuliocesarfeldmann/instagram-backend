import {
  createPool,
  type Pool
} from 'mysql'

export class DataBase {
  private pool: Pool

  constructor () {
    this.openConection()
  }

  private openConection (): void {
    this.pool = createPool({
      connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT ?? '4'),
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    })
  }

  public async execute<T>(query: string, params: string[] | unknown): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      this.pool.query(query, params, (error, results) => {
        console.log(error)
        console.log(results)
        if (error !== null) {
          reject(error)
        }
        else resolve(results)
      })
    })
  }

  public getPool (): Pool {
    return this.pool
  }
}
