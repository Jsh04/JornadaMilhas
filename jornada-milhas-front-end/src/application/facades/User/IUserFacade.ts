
import type { Result } from "../../../core/result/Result";
import type { LoginViewModel } from "../../useCases/LoginUseCase/LoginViewModel";

export default interface IUserFacade{

    login(loginViewModel: LoginViewModel): Promise<Result> 
}