import { type Role } from '../enum/role.enum'

export interface Token {
  exp: number
  accessTypes: string[]
  name: string
  userId: number
  role: Role
}
