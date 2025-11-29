import { inject, injectable } from "inversify";
import type IUserSessionRepository from "../../domain/repositories/IUserSessionRepository";
import type LoginOutputModel from "../../domain/outputs/Authentication/Login/LoginOutputModel";
import { InjectionKeys } from "../../constants/ServiceInjectionKeys";
import type IStorageRepository from "../interfaces/IStorageRepository";


@injectable()
export default class UserSessionRepository implements IUserSessionRepository {

    private readonly storageRepository:  IStorageRepository<LoginOutputModel>

    private readonly STORAGE_KEY = "user_session";

    constructor(@inject(InjectionKeys.StorageFactory) storageFactory: <T>() => IStorageRepository<T>){
        this.storageRepository = storageFactory();
    }

    saveSession(loginOutputModel: LoginOutputModel): void {
        this.storageRepository.setItem(this.STORAGE_KEY, loginOutputModel)
    }

    getSession(): LoginOutputModel | null {
        const session = this.storageRepository.getItem(this.STORAGE_KEY);
        
        if (!session) 
            return null;

        return session;
    }

    clearSession(): void {
        this.storageRepository.removeItem(this.STORAGE_KEY);
    }

}