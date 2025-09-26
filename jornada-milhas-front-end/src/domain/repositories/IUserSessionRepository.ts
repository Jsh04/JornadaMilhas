
import type LoginOutputModel from "../outputs/Authentication/Login/LoginOutputModel";

export default interface IUserSessionRepository{
    saveSession(loginOutputModel: LoginOutputModel): void;
    getSession(): LoginOutputModel | null;
    clearSession(): void;
}