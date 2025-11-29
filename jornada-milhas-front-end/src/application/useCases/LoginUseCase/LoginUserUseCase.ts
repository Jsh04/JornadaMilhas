import { inject, injectable } from "inversify";
import type IUserRepository from "../../../domain/repositories/IUserRepository";
import { InjectionKeys } from "../../../constants/ServiceInjectionKeys";
import type { LoginViewModel } from "./LoginViewModel";

import type IUserSessionRepository from "../../../domain/repositories/IUserSessionRepository";
import { Result } from "../../../core/result/Result";



@injectable()
export default class LoginUserUseCase{

    private readonly userRepository: IUserRepository;
    private readonly userSessionRepository : IUserSessionRepository

    constructor(@inject(InjectionKeys.UserRepository) userRepository: IUserRepository, 
    @inject(InjectionKeys.UserSessionRepository) authorizationService: IUserSessionRepository){
        this.userRepository = userRepository;
        this.userSessionRepository = authorizationService;
    }

    async execute(loginViewModel: LoginViewModel){
        const responseResult = await this.userRepository.login({ emailOrCpf: loginViewModel.loginData, password: loginViewModel.password });

        if (responseResult.isFailure) 
            return Result.fail(responseResult.error);
        
        this.userSessionRepository.saveSession(responseResult.value);
        
        return Result.ok();
    }

}