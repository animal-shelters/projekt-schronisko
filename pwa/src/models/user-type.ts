import Roles from "./role-type";

export default interface User {
    id: number;
    roles: Roles;
}

export interface FullUser {
    id: number;
    email: string;
    roles: Roles;
}

export interface UserDto {
    "@id": string;
    email: string;
    roles: Roles;
}
