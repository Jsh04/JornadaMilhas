import type { Container, Factory  } from "inversify";
import HttpClient from "../infrastructure/api/HttpClient";
import EnvironmentConfig from "../infrastructure/config/EnvironmentConfig";
import RouterConfig from "../routes";
import type IUserRepository from "../domain/repositories/IUserRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { InjectionKeys } from "../constants/ServiceInjectionKeys";
import LoginUserUseCase from "../application/useCases/LoginUseCase/LoginUserUseCase";
import type IUserFacade from "../application/facades/User/IUserFacade";
import { UserFacade } from "../application/facades/User/UserFacade";
import type IStorageRepository from "../infrastructure/interfaces/IStorageRepository";
import LocalStorageRepository from "../infrastructure/adapters/storages/LocalStorageRepository";
import UserSessionRepository from '../infrastructure/adapters/UserSessionRepository';
import type IUserSessionRepository from "../domain/repositories/IUserSessionRepository";
import AuthorizationService from "../application/services/AuthorizationService";
import type { INotificationService } from "../application/interfaces/services/INotificationService";
import SweetAlertNotificationService from "../infrastructure/adapters/services/SweetAlertNotificationService";
import type ICustomerRepository from "../domain/repositories/ICustomerRepository";
import CustomerRepository from '../infrastructure/repositories/CustomerRepository';
import RegisterCustomerUseCase from "../application/useCases/RegisterCustomerUseCase/RegisterCustomerUseCase";

export default class ServiceInjectionConfig{

    public static addContainerBindsToInjection(container: Container) {
       this.addContainerBindsToInjectionInfrastructure(container);
       this.addContainerBindsOfRepositoriesToInjection(container);
       this.addContainerBindsOfUseCasesToInjection(container);
       this.addContainerBindsFacadeToInjection(container);
       this.addStorageBindsOfRepositoryToInjection(container);
       this.addContainerBindsToServices(container);
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
        container.bind<RegisterCustomerUseCase>(RegisterCustomerUseCase).toSelf().inTransientScope();
    }

    private static addContainerBindsOfRepositoriesToInjection(container: Container){
        container.bind<IUserRepository>(InjectionKeys.UserRepository).to(UserRepository);
        container.bind<IUserSessionRepository>(InjectionKeys.UserSessionRepository).to(UserSessionRepository);
        container.bind<ICustomerRepository>(InjectionKeys.CustomerRepository).to(CustomerRepository)
    }

    private static addStorageBindsOfRepositoryToInjection(container: Container){
        container
            .bind<Factory<IStorageRepository<any>>>(InjectionKeys.StorageFactory)
            .toFactory(() => {
                return <T>() => {
                    return new LocalStorageRepository<T>();
                };
            });
    }

    private static addContainerBindsToServices(container: Container){
        container.bind<AuthorizationService>(AuthorizationService).toSelf().inTransientScope();
        container.bind<INotificationService>(InjectionKeys.NotificationService).to(SweetAlertNotificationService).inSingletonScope()
    }
}