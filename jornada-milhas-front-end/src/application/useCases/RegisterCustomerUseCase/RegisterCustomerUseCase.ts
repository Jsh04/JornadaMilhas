import { inject } from "inversify";
import { InjectionKeys } from "../../../constants/ServiceInjectionKeys";
import type { Result } from "../../../core/result/Result";
import type { RegisterCustomerViewModel } from "./RegisterCustomerViewModel";
import type ICustomerRepository from "../../../domain/repositories/ICustomerRepository";

export default class RegisterCustomerUseCase{

    private readonly customerRepository: ICustomerRepository;

    constructor(@inject(InjectionKeys.CustomerRepository) customerRepository: ICustomerRepository){
        this.customerRepository = customerRepository;
    }

    public  async execute(registerCustomerViewModel: RegisterCustomerViewModel): Promise<Result>{

        const customerRegisterInputModel = registerCustomerViewModel.toInputModel();

        return await this.customerRepository.register(customerRegisterInputModel);
    }

}