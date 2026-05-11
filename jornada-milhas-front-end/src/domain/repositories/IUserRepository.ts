import type { ResultValue } from "../../core/result/Result";
import type LoginInputModel from "../inputs/LoginInputModel";
import type LoginOutputModel from "../outputs/Authentication/Login/LoginOutputModel";

export default interface IUserRepository{
    login(loginInputModel: LoginInputModel): Promise<ResultValue<LoginOutputModel>>
    
}