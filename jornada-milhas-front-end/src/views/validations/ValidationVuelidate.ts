


import type { ValidationRule } from "@vuelidate/core";

import { email, required, minLength, sameAs, minValue, helpers } from "@vuelidate/validators";
import { CpfValidator } from "../../core/validations/CpfValidator";

type ValidatorObject = Record<string, ValidationRule>;

export default class ValidationVuelidateBuilder {

    private listValidators: ValidatorObject[] = [];

    public static createBuild() {
        return new ValidationVuelidateBuilder();
    }

    public addRequired(message: string, key: string = "required") {
        this.listValidators.push({ [key]: helpers.withMessage(message, required) });
        return this;
    }

    public addEmail(message: string, key: string = "email") {
        this.listValidators.push({ [key]: helpers.withMessage(message, email) });
        return this;
    }

    public addMinLength(message: string, minLengthValue: number, key: string = "minLength") {
        this.listValidators.push({ [key]: helpers.withMessage(message, minLength(minLengthValue)) });
        return this;
    }

    public addMinValue(message: string, minValueValue: number, key: string = "minValue") {
        this.listValidators.push({ [key]: helpers.withMessage(message, minValue(minValueValue)) });
        return this;
    }

    public addSameAs(message: string, valueToCompare: any, key: string = "sameAs") {
        this.listValidators.push({ [key]: helpers.withMessage(message, sameAs(valueToCompare)) });
        return this;
    }

    public addCustomRule(message: string, rule: ValidationRule, key: string) {
        this.listValidators.push({ [key]: helpers.withMessage(message, rule) });
        return this;
    }

    public addCpf(message: string, key: string = "cpf") {
        this.listValidators.push({
            [key]: helpers.withMessage(message, (value: string) => CpfValidator.validCpf(value))
        });
        return this;
    }

    public build(): ValidatorObject {
        return this.listValidators.reduce((acc, obj) => ({ ...acc, ...obj }), {});
    }
}
