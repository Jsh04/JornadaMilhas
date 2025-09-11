import type { LoginViewModel } from "../../useCases/LoginUseCase/LoginViewModel";

export default interface IUserFacade{

    login(loginViewModel: LoginViewModel): Promise<string>
}