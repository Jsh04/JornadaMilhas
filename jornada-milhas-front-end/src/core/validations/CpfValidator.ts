export class CpfValidator {

    public static validCpf(cpf: string): boolean {
        if (!cpf)
            return false;

        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11)
            return false;

        if (/^(\d)\1{10}$/.test(cpf))
            return false;


        const digit1 = this.calculateDigit(cpf.slice(0, 9), 10);
        const digit2 = this.calculateDigit(cpf.slice(0, 9) + digit1, 11);

        return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
    }

    private static calculateDigit(cpfSlice: string, factor: number) {
        let total = 0;

        for (let i = 0; i < cpfSlice.length; i++) 
            total += parseInt(cpfSlice[i]) * (factor - i);
        
        const resto = total % 11;
        return resto < 2 ? 0 : 11 - resto;
    };
}