import type { AxiosInstance } from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import EnvironmentConfig from '../config/EnvironmentConfig';


@injectable()
export default class HttpClient {

    private httpClient: AxiosInstance;
    private readonly environmentConfig: EnvironmentConfig
    
    constructor(@inject(EnvironmentConfig) environmentConfig: EnvironmentConfig) {
        this.environmentConfig = environmentConfig;
        this.httpClient = this.getInstanceAxios(this.environmentConfig)
        this.setConfigRequest();
    }


    get instanceHttpClient(){
        return this.httpClient;
    }

    setConfigRequest() {
        this.httpClient.interceptors.request.use(
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
}