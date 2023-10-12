import { type Role } from '../enum/role.enum'
import { type Permission } from './permission.model'

export interface User {
  id: number
  firstName: string
  lastName: string
  city: string
  state: string
  country: string
  email: string
  password: string
  role: Role
  permission: Permission
}
