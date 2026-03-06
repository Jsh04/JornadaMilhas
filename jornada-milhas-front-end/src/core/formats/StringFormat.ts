
export default class StringFormat {
    
    public static onlyNumbers(value: string): string {
        if (!value) 
            return '';

        return value.replace(/\D/g, '');
    }
}
