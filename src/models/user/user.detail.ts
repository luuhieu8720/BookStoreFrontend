import {Role} from "./role";

export interface UserDetail{
    id: number,
    name: string,
    username: string,
    role: Role
}