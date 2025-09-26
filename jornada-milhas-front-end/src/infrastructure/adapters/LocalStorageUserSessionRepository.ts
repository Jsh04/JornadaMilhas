import { injectable } from "inversify";
import type IUserSessionRepository from "../../domain/repositories/IUserSessionRepository";
import type LoginOutputModel from "../../domain/outputs/Authentication/Login/LoginOutputModel";

@injectable()
export default class LocalStorageUserSessionRepository implements IUserSessionRepository{

    
    saveSession(loginOutputModel: LoginOutputModel): void {

        throw new Error("Method not implemented.");
    }
    getSession(): LoginOutputModel | null {
        throw new Error("Method not implemented.");
    }
    clearSession(): void {
        throw new Error("Method not implemented.");
    }

}