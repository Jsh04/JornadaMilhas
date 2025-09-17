import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import EnvironmentConfig from '../config/EnvironmentConfig';
import type ProblemDetails from "./ProblemsDetails";
import Result from "../../core/result/Result";


@injectable()
export default class HttpClient {

    private readonly _httpClient: AxiosInstance;
    private readonly environmentConfig: EnvironmentConfig
    
    constructor(@inject(EnvironmentConfig) environmentConfig: EnvironmentConfig) {
        this.environmentConfig = environmentConfig;
        this._httpClient = this.getInstanceAxios(this.environmentConfig)
        this.setConfigRequest();
        this.setConfigResponse();
    }

    get httpClient(){
        return this._httpClient;
    }

    private setConfigRequest() {
        this._httpClient.interceptors.request.use(
            (config) => {
                if (this.environmentConfig.isDevelopment() && this.environmentConfig.get('ENABLE_DEBUG'))
                    console.log('🚀 Request:', {
                        method: config.method?.toUpperCase(),
                        url: config.url,
                        baseURL: config.baseURL,
                        data: config.data,
                    });
                const token = localStorage.getItem('auth_token');
                if (token) 
                    config.headers.Authorization = `Bearer ${token}`;
                
                return config;
            },
            (error) => {
                if (this.environmentConfig.isDevelopment()) 
                    console.error('❌ Request Error:', error);
                
                return Promise.reject(error);
            }
        );
    }

    private setConfigResponse() {
        this._httpClient.interceptors.response.use((config) => {
            return config;
        }, (error) => {

            if (this.environmentConfig.isDevelopment()) 
                console.error('❌ Request Error:', error);

            const errorAxios = error as AxiosError;

            if (!errorAxios.response) 
                return this.returnDefaultResultFail(errorAxios.status || 0, "Erro inesperado, tente novamente mais tarde", "Erro inesperado!")
            
            const problemsDetails = errorAxios.response?.data as ProblemDetails

            return this.returnDefaultResultFail(errorAxios.status || 0,  problemsDetails.detail, problemsDetails.title);
        })
    }

    private getInstanceAxios(environmentConfig: EnvironmentConfig): AxiosInstance {
        return axios.create({
            baseURL: environmentConfig.getApiUrl(),
            timeout: environmentConfig.get('API_TIMEOUT'),
            headers: {
                'Content-Type': 'application/json',
                'X-App-Version': environmentConfig.get('APP_VERSION'),
            }
        });
    }

    private returnDefaultResultFail<T>(statusCode: number, message: string, title: string): Promise<Result<T>>{
        return Promise.reject(Result.fail({ statusCode, message, title }));
    }
}