
import { CpfValidator } from "../../../core/validations/CpfValidator";
import EmailValidator from "../../../core/validations/EmailValidator";
import ValidationVuelidateBuilder from "../../validations/ValidationVuelidate"
export const loginValidation = () => {
    return {
        loginData: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo deverá ser obrigatório.")
        .addCustomRule("Deve ser um CPF ou Email válido", (value: string) => {
            if (!value) 
                return false;

            const isEmail = EmailValidator.validEmail(value);
            const isCpf = CpfValidator.validCpf(value);

            return isEmail || isCpf;
        }, "CpfOrEmail")
        .build(),

        password: 
        ValidationVuelidateBuilder
        .createBuild()
        .addRequired("Campo de senha é obrigatório.")
        .build()

    }
}