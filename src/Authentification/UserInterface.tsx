export interface User {
    userId: number
    userName: string
    userPseudo: string
    userPassword: string
    userRole: Role
}

export enum Role {
    USER = 'USER',
    ADMIN= 'ADMIN'
}

export const USER_ID = 'userId'
export const USER_NAME = 'userName'
export const USER_PSEUDO = 'userPseudo'
export const USER_PASSWORD = 'userPassword'
export const USER_ROLE = 'userRole'