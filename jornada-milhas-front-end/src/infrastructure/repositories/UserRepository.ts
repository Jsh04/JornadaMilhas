import { injectable, inject } from 'inversify';
import type LoginInputModel from "../../domain/inputs/LoginInputModel";
import type IUserRepository from "../../domain/repositories/IUserRepository";
import HttpClient from "../api/HttpClient";
import { type AxiosInstance } from 'axios';

import type LoginOutputModel from '../../domain/outputs/Authentication/Login/LoginOutputModel';
import { ResultValue } from '../../core/result/Result';

@injectable()
export class UserRepository implements IUserRepository{

    private readonly httpClient: AxiosInstance;

    constructor(@inject(HttpClient) httpConfig: HttpClient){
        this.httpClient = httpConfig.httpClient;
    }
    
    async login(loginInputModel: LoginInputModel): Promise<ResultValue<LoginOutputModel>> {

        try {
            const response = await this.httpClient.post<LoginOutputModel>('/login', loginInputModel);
            return ResultValue.ok<LoginOutputModel>(response.data);
        } catch (error) {
            return error as ResultValue<LoginOutputModel>;
        }
    }

}