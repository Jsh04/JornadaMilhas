import DateValidator from "../../../core/validations/DateValidator"
import ValidationVuelidateBuilder from "../../validations/ValidationVuelidate"

export default () => {
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
        .addCpf("Por favor, preencha um CPF válido")
        .addRequired("Campo de CPF é obrigatório")
        .build()
        
    }
}