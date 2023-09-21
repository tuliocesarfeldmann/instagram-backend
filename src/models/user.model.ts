import { type Role } from './role.model'
import { Role as RoleEnum } from '../enum/role.enum'

export interface User {
  id: number
  name: string
  roles: RoleEnum
}
