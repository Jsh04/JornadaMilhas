import { inject, injectable } from "inversify";
import type IUserRepository from "../../../domain/repositories/IUserRepository";
import { InjectionKeys } from "../../../constants/ServiceInjectionKeys";
import type { LoginViewModel } from "./LoginViewModel";


@injectable()
export default class LoginUserUseCase{


    private readonly userRepository: IUserRepository;

    constructor(@inject(InjectionKeys.UserRepository) userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async execute(loginViewModel: LoginViewModel){
        await this.userRepository.login({ emailOrCpf: loginViewModel.loginData, password: loginViewModel.password });
    }

}