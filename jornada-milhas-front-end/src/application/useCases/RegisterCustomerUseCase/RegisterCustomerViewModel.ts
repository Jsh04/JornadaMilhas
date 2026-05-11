import StringFormat from "../../../core/formats/StringFormat"
import type { CustomerRegisterInputModel } from "../../../domain/inputs/CustomerRegisterInputModel"

export class RegisterCustomerViewModel{
    name: string = ''
    dtBirth = ''
    genre = '1'
    cpf = ''
    phone = ''
    city = '';
    state = '';
    email = '';
    emailConfirm = '';
    password = '';
    passwordConfirm = '';
    confirmrReadTerms = false


    public toInputModel(): CustomerRegisterInputModel{

        return {
            name: this.name,
            dtBirth: new Date(this.dtBirth),
            cpf: StringFormat.onlyNumbers(this.cpf),
            confirmMail: this.emailConfirm,
            mail: this.email,
            password: this.password,
            phone: StringFormat.onlyNumbers(this.phone),
            confirmPassword: this.passwordConfirm,
            address: {
                city: this.city,
                state: this.state
            },
            genre: Number(this.genre)
        } as CustomerRegisterInputModel
    }
}