
import { inject, injectable } from "inversify";
import LoginUserUseCase from "../../useCases/LoginUseCase/LoginUserUseCase";
import type { LoginViewModel } from "../../useCases/LoginUseCase/LoginViewModel";
import type IUserFacade from "./IUserFacade";
import type { Result } from "../../../core/result/Result";
import RegisterCustomerUseCase from "../../useCases/RegisterCustomerUseCase/RegisterCustomerUseCase";
import { RegisterCustomerViewModel } from '../../useCases/RegisterCustomerUseCase/RegisterCustomerViewModel';


@injectable()
export class UserFacade implements IUserFacade{

    private readonly loginUseCase: LoginUserUseCase;

    private readonly registerCustomerUseCase: RegisterCustomerUseCase;

    constructor(@inject(LoginUserUseCase)loginUseCase: LoginUserUseCase, @inject(RegisterCustomerUseCase) registerCustomerUseCase: RegisterCustomerUseCase){
        this.loginUseCase = loginUseCase;
        this.registerCustomerUseCase = registerCustomerUseCase;
    }

    async customerRegister(registerCustomerUseCase: RegisterCustomerViewModel): Promise<Result> {
        const result = await this.registerCustomerUseCase.execute(registerCustomerUseCase);

        return result;
    }

    public async login(loginViewModel: LoginViewModel): Promise<Result> {
        var result = await this.loginUseCase.execute(loginViewModel);
        
        return result;
    }



}