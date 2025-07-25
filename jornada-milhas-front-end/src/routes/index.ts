import { createRouter, createWebHistory, type Router } from "vue-router";
import EnvironmentConfig from '../config/EnvironmentConfig';


export default class RouterConfig {
    private readonly router: Router;
    private readonly environmentConfig: EnvironmentConfig;

    constructor(environmentConfig: EnvironmentConfig) {
        this.environmentConfig = environmentConfig;

        this.router = createRouter({
            history: createWebHistory(this.getBaseUrl()),
            routes: []
        })
    }

    get routerObject(){
        return this.router;
    }
    
    private getBaseUrl(): string {
        if (import.meta.env.VITE_BASE_URL) 
            return import.meta.env.VITE_BASE_URL

        if (import.meta.env.BASE_URL) 
            return import.meta.env.BASE_URL
        
        const appEnv = this.environmentConfig.get('APP_ENV')

        switch (appEnv) {
            case 'development':
                return '/';

            case 'staging':
                return '/app/';

            case 'production':
                if (typeof window === 'undefined')
                    return '/';

                const path = window.location.pathname

                if (path.startsWith('/app/')) 
                        return '/app/'
                
                return '/'

            default:
                return '/'
        }
    }
}