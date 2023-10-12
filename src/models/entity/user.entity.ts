import { type Role } from '../../enum/role.enum'
import { Permission } from './permission.entity'
import { OneToOne, Column, PrimaryGeneratedColumn, Entity, JoinColumn, Table } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'role_id' })
  role: Role

  @OneToOne(() => Permission, (permission) => permission.user, { cascade: true, onDelete: 'CASCADE' })
  permission: Permission
}
