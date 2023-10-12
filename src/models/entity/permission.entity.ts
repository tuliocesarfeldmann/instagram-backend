import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  create: boolean

  @Column()
  read: boolean

  @Column()
  update: boolean

  @Column()
  delete: boolean

  @OneToOne(() => User, (user) => user.permission)
  @JoinColumn({ name: 'user_id' })
  user: User
}
