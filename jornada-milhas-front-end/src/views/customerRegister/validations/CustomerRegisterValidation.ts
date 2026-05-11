
import type { RegisterCustomerViewModel } from "../../../application/useCases/RegisterCustomerUseCase/RegisterCustomerViewModel";
import DateValidator from "../../../core/validations/DateValidator"
import PhoneValidator from "../../../core/validations/PhoneValidator";
import ValidationVuelidateBuilder from '../../validations/ValidationVuelidate';

export default (registerCustomerViewModel: RegisterCustomerViewModel) => {
    return {
        name: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo nome é obrigatório")
        .addMinLength("Campo deverá ter no mínimo 3 caracteres", 3)
        .build(),
        dtBirth: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo de data de nascimento é obrigatório")
        .addCustomRule(
            "Usuário deverá ter mais de 18 anos para realizar o cadastro", 
            (value: string) => DateValidator.minAge(value, 18), 
            "MinAgeDtBirth")
        .addCustomRule(
            "Data selecionada não deve ser futura", 
            (value: string) => DateValidator.notFutureDate(value), 
            "notFutureDateDtBirth"
        )
        .build(),
        cpf: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo de CPF é obrigatório")
        .addCpf("Por favor, preencha um CPF válido")
        .build(),
        phone: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo de telefone é obrigatório")
        .addCustomRule("Por favor, preencha um número de telefone válido", (value: string) => PhoneValidator.isValid(value), "IsValidPhone")
        .build(),
        city: ValidationVuelidateBuilder.createBuild()
        .addRequired('Campo cidade é obrigatório')
        .build(),
        state: ValidationVuelidateBuilder.createBuild()
        .addRequired('Campo estado é obrigatório')
        .build(),
        email: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo e-mail é obrigatório")
        .addEmail('Por favor, preencha uma e-mail válido')
        .build(),
        emailConfirm: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo de confirmação de e-mail é obrigatório")
        .addEmail('Por favor, preencha uma e-mail válido')
        .addSameAs("E-mail deve ser o mesmo para o e-mail fornecido", registerCustomerViewModel.email, "ConfirmEmail")
        .build(),
        password: ValidationVuelidateBuilder.createBuild()
        .addRequired('Campo senha é obrigatório')
        .build(),
        passwordConfirm: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo de confirmação de senha é obrigatório")
        .addSameAs("Senha deve ser o mesmo para o senha fornecida", registerCustomerViewModel.password, "ConfirmPassword")
        .build()
    }
}