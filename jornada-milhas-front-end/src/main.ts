import { createApp } from 'vue'
import App from './App.vue'
import { Container } from 'inversify'
import './styles/style.css'
import "reflect-metadata";
import ServiceInjectionConfig from './config/ServiceInjectionConfig';
import RouterConfig from './routes';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const container = new Container();

ServiceInjectionConfig.addContainerBindsToInjection(container);

const routerConfigObject = container.get<RouterConfig>(RouterConfig)

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

app.mount('#app')

