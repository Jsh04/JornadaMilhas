import type User from "../entities/User";

export default interface LoginOutputModel{
    token: string,
    user: User
}