import { dataSource } from '../config/db.config'
import { User } from '../models/entity/user.entity' 
import { Repository } from 'typeorm'

export class UserDAO {
  readonly userRepository: Repository<User>

  constructor () {
    this.userRepository = dataSource.getRepository(User)
  }

  public createUser (user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}
