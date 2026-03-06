
import type { Result } from "../../../core/result/Result";
import type { LoginViewModel } from "../../useCases/LoginUseCase/LoginViewModel";
import type { RegisterCustomerViewModel } from "../../useCases/RegisterCustomerUseCase/RegisterCustomerViewModel";

export default interface IUserFacade{

    login(loginViewModel: LoginViewModel): Promise<Result>;

    customerRegister(registerCustomerUseCase: RegisterCustomerViewModel): Promise<Result>
}