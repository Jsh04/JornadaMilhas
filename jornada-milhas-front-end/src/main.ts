import { createApp } from 'vue'
import App from './App.vue'
import { Container } from 'inversify'
import './styles/style.css'
import 'vue-loading-overlay/dist/css/index.css';
import "reflect-metadata";
import ServiceInjectionConfig from './infrastructure/di/ServiceInjectionConfig';
import RouterConfig from './routes';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { InjectionKeys } from './constants/ServiceInjectionKeys';
import type IUserFacade from './application/facades/User/IUserFacade';

const container = new Container();

ServiceInjectionConfig.addContainerBindsToInjection(container);

const routerConfigObject = container.get<RouterConfig>(RouterConfig)
const userFacade = container.get<IUserFacade>(InjectionKeys.UserFacade);

const app = createApp(App)
.use(routerConfigObject.routerObject)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
})
.provide(InjectionKeys.UserFacade, userFacade)
.provide(InjectionKeys.RouterConfig, routerConfigObject.routerObject)
app.mount('#app')

