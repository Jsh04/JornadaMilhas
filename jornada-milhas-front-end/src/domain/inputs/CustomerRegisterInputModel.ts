export interface CustomerRegisterInputModel{
    name: string,
    dtBirth: Date,
    genre: number,
    cpf: string,
    phone: string,
    address: AddressInputModel,
    mail: string,
    confirmMail: string,
    password: string,
    confirmPassword: string
}

export interface AddressInputModel{
    city: string,
    state: string,
    zipCode?: string,
    address?: string,
    district?: string
}