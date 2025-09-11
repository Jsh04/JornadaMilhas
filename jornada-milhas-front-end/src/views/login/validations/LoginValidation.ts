
import { CpfUtils } from "../../../utils/CpfUtils";
import EmailUtils from "../../../utils/EmailUtils";
import ValidationVuelidateBuilder from "../../validations/ValidationVuelidate"
export const loginValidation = () => {
    return {
        loginData: ValidationVuelidateBuilder.createBuild()
        .addRequired("Campo deverá ser obrigatório.")
        .addCustomRule("Deve ser um CPF ou Email válido", (value: string) => {
            if (!value) 
                return false;

            const isEmail = EmailUtils.validEmail(value);
            const isCpf = CpfUtils.validCpf(value);

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