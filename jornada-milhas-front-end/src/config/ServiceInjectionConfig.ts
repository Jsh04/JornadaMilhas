import type { Container } from "inversify";
import HttpClient from "../infrastructure/api/HttpClient";
import EnvironmentConfig from "./EnvironmentConfig";
import RouterConfig from "../routes";

export default class ServiceInjectionConfig{

    public static addContainerBindsToInjection(container: Container) {
       this.addContainerBindsToInjectionInfrastructure(container);
    }

    private static addContainerBindsToInjectionInfrastructure(container: Container){
        container.bind<HttpClient>(HttpClient).toSelf().inSingletonScope();
        container.bind<EnvironmentConfig>(EnvironmentConfig).toSelf().inSingletonScope();
        container.bind<RouterConfig>(RouterConfig).toSelf().inSingletonScope();
    }
}