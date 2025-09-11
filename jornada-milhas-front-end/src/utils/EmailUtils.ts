export default class EmailUtils{

    public static validEmail(emailValue: string){
        if (!emailValue) return false;

        const regex = /^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(emailValue);
    }
}