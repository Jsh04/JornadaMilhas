import type { Result } from "../../core/result/Result";
import type { CustomerRegisterInputModel } from "../inputs/CustomerRegisterInputModel";

export default interface ICustomerRepository{
    register(customerRegisterInputModel: CustomerRegisterInputModel): Promise<Result> 
}