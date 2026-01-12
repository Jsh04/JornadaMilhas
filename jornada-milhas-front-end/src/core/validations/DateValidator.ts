
export default class DateValidator {

    public static dateIsValid(value: string | null | undefined): boolean{
        if (!value) 
            return false;

        const dateString = this.addUtcInDateString(value);

        const dateParsed = new Date(dateString);

        return !isNaN(dateParsed.getTime());
    }

    public static minAge(value: string, minAgeValue: number): boolean {
        
        if (!this.dateIsValid(value)) 
            return false;
    
        const birthDate = new Date(this.addUtcInDateString(value));
        const today = new Date();
        
        const birthYear = birthDate.getUTCFullYear();
        const birthMonth = birthDate.getUTCMonth();
        const birthDay = birthDate.getUTCDate();
        
        const todayYear = today.getUTCFullYear();
        const todayMonth = today.getUTCMonth();
        const todayDay = today.getUTCDate();
        
        let age = todayYear - birthYear;
        const monthDiff = todayMonth - birthMonth;
        
        if (monthDiff < 0 || (monthDiff === 0 && todayDay < birthDay))
            age--;
        
        
        return age >= minAgeValue;
    }

    public static notFutureDate(value: string) {
        if (!this.dateIsValid(value)) 
            return false;

        const dateParsed = new Date(this.addUtcInDateString(value));
        const today = new Date();

        return dateParsed <= today;
    };

    private static addUtcInDateString(value: string){
        return value.includes('T') ? value : `${value}T00:00:00.000Z`;
    }

}