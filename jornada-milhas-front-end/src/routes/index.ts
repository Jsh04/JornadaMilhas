import { createRouter, createWebHistory, type Router } from "vue-router";
import EnvironmentConfig from '../infrastructure/config/EnvironmentConfig';
import { inject, injectable } from "inversify";
import Login from "../views/login/Login.vue";
import Home from "../views/home/Home.vue";


@injectable()
export default class RouterConfig {
    private readonly router: Router;
    private readonly environmentConfig: EnvironmentConfig;

    constructor(@inject(EnvironmentConfig) environmentConfig: EnvironmentConfig) {
        this.environmentConfig = environmentConfig;

        this.router = createRouter({
            history: createWebHistory(this.getBaseUrl()),
            routes: [
                {
                    path: '/',
                    component: Home,
                    alias: '/home',
                },
                {
                    path: '/login',
                    component: Login,
                }
            ]
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