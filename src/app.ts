import express, { type Application, type Request, type Response } from 'express'
import { DataBase } from './config/db.config'
import * as dotenv from 'dotenv'
import { UserRouter } from './routes/user.router'
import { AuthRouter } from './routes/auth.router'
import { CustomError } from './models/customError.model'

dotenv.config()

class App {
  public app: Application
  public port: string | number

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? 3000

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.initializeDb()
    this.initializeRoutes()
    this.initializeMiddlewares()
  }

  private initializeMiddlewares (): void {
    this.app.use((err: Error | CustomError, req: Request, res: Response, next: any) => {
      console.error(err)

      if (err instanceof CustomError) {
        res.status(err.code).send({ reason: err.message })
        return
      }

      res.status(500).send({
        reason: err.message ?? 'Erro interno no servidor'
      })
    })
  }

  private initializeRoutes (): void {
    this.app.use('/user', new UserRouter().initializeRoutes())
    this.app.use('/auth', new AuthRouter().initializeRoutes())
  }

  private initializeDb (): void {
    new DataBase()
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor está rodando na porta ${this.port}`)
    })
  }
}

const app = new App()
app.listen()
