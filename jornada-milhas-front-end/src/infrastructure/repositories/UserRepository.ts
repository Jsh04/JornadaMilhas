import { injectable, inject } from 'inversify';
import type LoginInputModel from "../../domain/inputs/LoginInputModel";
import type IUserRepository from "../../domain/repositories/IUserRepository";
import HttpClient from "../api/HttpClient";
import type { AxiosInstance } from 'axios';

@injectable()
export class UserRepository implements IUserRepository{

    private httpClient: AxiosInstance;

    constructor(@inject(HttpClient) httpConfig: HttpClient){
        this.httpClient = httpConfig.instanceHttpClient;
    }
    
    async login(loginInputModel: LoginInputModel): Promise<string> {
        await this.httpClient.post<string>('/login', loginInputModel);
        
        console.log('Fez a request')
        return "";
    }

}