import Roles from "./role-type";

export default interface User {
    id: number;
    roles: Roles;
}