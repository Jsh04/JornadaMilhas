export default class PhoneValidator{

    private static readonly NUMBERS_ONLY_REGEX = /\D/g;


    public static isValid(phone: string | null | undefined): boolean {
        
        if (!phone) 
            return false;

        const cleaned = phone.replace(this.NUMBERS_ONLY_REGEX, '');
        
        if (cleaned.length < 10 || cleaned.length > 13) 
            return false;

        const phoneWithoutCountryCode = cleaned.startsWith('55') && cleaned.length > 11 
        ? cleaned.substring(2) 
        : cleaned;

        if (phoneWithoutCountryCode.length !== 10 && phoneWithoutCountryCode.length !== 11)
        return false;
        
        const ddd = parseInt(phoneWithoutCountryCode.substring(0, 2));

        if (ddd < 11 || ddd > 99) 
            return false;

        if (phoneWithoutCountryCode.length !== 11) 
            return true;

        const firstDigit = phoneWithoutCountryCode.charAt(2);

        return firstDigit === '9';
  }

}