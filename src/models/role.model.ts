import { Role as RoleEnum } from "../enum/role.enum"

export interface Role {
    roleType: RoleEnum
    rolePermissions: string[]
}