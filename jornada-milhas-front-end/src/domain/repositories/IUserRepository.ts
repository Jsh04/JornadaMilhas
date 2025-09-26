import type LoginInputModel from "../inputs/LoginInputModel";
import Result from '../../core/result/Result';
import type LoginOutputModel from "../outputs/Authentication/Login/LoginOutputModel";

export default interface IUserRepository{
    login(loginInputModel: LoginInputModel): Promise<Result<LoginOutputModel>>
}