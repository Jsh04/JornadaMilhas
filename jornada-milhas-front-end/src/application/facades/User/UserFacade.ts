
import { inject, injectable } from "inversify";
import LoginUserUseCase from "../../useCases/LoginUseCase/LoginUserUseCase";
import type { LoginViewModel } from "../../useCases/LoginUseCase/LoginViewModel";
import type IUserFacade from "./IUserFacade";
import type { Result } from "../../../core/result/Result";


@injectable()
export class UserFacade implements IUserFacade{

    private readonly loginUseCase: LoginUserUseCase;

    constructor(@inject(LoginUserUseCase)loginUseCase: LoginUserUseCase){
        this.loginUseCase = loginUseCase;
    }

    public async login(loginViewModel: LoginViewModel): Promise<Result> {
        var result = await this.loginUseCase.execute(loginViewModel);
        
        return result;
    }

}