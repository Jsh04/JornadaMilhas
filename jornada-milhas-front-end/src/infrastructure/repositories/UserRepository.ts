import { injectable, inject } from 'inversify';
import type LoginInputModel from "../../domain/inputs/LoginInputModel";
import type IUserRepository from "../../domain/repositories/IUserRepository";
import HttpClient from "../api/HttpClient";
import { type AxiosInstance } from 'axios';
import Result from '../../core/result/Result';
import type LoginOutputModel from '../../domain/outputs/Authentication/Login/LoginOutputModel';

@injectable()
export class UserRepository implements IUserRepository{

    private readonly httpClient: AxiosInstance;

    constructor(@inject(HttpClient) httpConfig: HttpClient){
        this.httpClient = httpConfig.httpClient;
    }
    
    async login(loginInputModel: LoginInputModel): Promise<Result<LoginOutputModel>> {

        try {
            const response = await this.httpClient.post<LoginOutputModel>('/login', loginInputModel);
            return Result.ok(response.data);
        } catch (error) {
            return error as Result<LoginOutputModel>;
        }
    }

}