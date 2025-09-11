import type { Container } from "inversify";
import HttpClient from "../api/HttpClient";
import EnvironmentConfig from "../config/EnvironmentConfig";
import RouterConfig from "../../routes";
import type IUserRepository from "../../domain/repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { InjectionKeys } from "../../constants/ServiceInjectionKeys";
import LoginUserUseCase from "../../application/useCases/LoginUseCase/LoginUserUseCase";
import type IUserFacade from "../../application/facades/User/IUserFacade";
import { UserFacade } from "../../application/facades/User/UserFacade";

export default class ServiceInjectionConfig{

    public static addContainerBindsToInjection(container: Container) {
       this.addContainerBindsToInjectionInfrastructure(container);
       this.addContainerBindsOfRepositoriesToInjection(container);
       this.addContainerBindsOfUseCasesToInjection(container);
       this.addContainerBindsFacadeToInjection(container);
    }

    private static addContainerBindsToInjectionInfrastructure(container: Container){
        container.bind<HttpClient>(HttpClient).toSelf().inSingletonScope();
        container.bind<EnvironmentConfig>(EnvironmentConfig).toSelf().inSingletonScope();
        container.bind<RouterConfig>(RouterConfig).toSelf().inSingletonScope();
    }

    private static addContainerBindsFacadeToInjection(container: Container){
        container.bind<IUserFacade>(InjectionKeys.UserFacade).to(UserFacade);
    }

    private static addContainerBindsOfUseCasesToInjection(container: Container){
        container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf().inTransientScope();
    }

    private static addContainerBindsOfRepositoriesToInjection(container: Container){
        container.bind<IUserRepository>(InjectionKeys.UserRepository).to(UserRepository);
    }
}