import type LoginInputModel from "../inputs/LoginInputModel";

export default interface IUserRepository{
    login(loginInputModel: LoginInputModel): Promise<string>
}