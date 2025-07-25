import { createApp } from 'vue'
import App from './App.vue'
import { Container } from 'inversify'
import './styles/style.css'
import "reflect-metadata";
import ServiceInjectionConfig from './config/ServiceInjectionConfig';

const container = new Container();
ServiceInjectionConfig.addContainerBindsToInjection(container);

createApp(App).mount('#app')
