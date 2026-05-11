import type { AxiosInstance } from "axios";
import type { CustomerRegisterInputModel } from "../../domain/inputs/CustomerRegisterInputModel";
import type ICustomerRepository from "../../domain/repositories/ICustomerRepository";
import HttpClient from "../api/HttpClient";
import { Result } from "../../core/result/Result";
import { inject } from "inversify";

export default class CustomerRepository implements ICustomerRepository{

    private readonly httpClient: AxiosInstance;

    constructor(@inject(HttpClient) httpConfig: HttpClient){
        this.httpClient = httpConfig.httpClient;
    }

    public async register(customerRegisterInputModel: CustomerRegisterInputModel): Promise<Result> {
        try {
            await this.httpClient.post<CustomerRegisterInputModel>('/customer', customerRegisterInputModel);
            return Result.ok();
        } catch (error) {
            return error as Result;
        }
    }
} 