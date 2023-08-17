import { Auth } from "./auth.interface";

export interface User extends Auth{
    name: String,
    description: String,
    mobile: string,
}