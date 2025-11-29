import { inject, injectable } from "inversify";
import type IUserSessionRepository from "../../domain/repositories/IUserSessionRepository";
import { InjectionKeys } from "../../constants/ServiceInjectionKeys";

@injectable()
export default class AuthorizationService{

    private readonly userSessionRepository: IUserSessionRepository;
    
    constructor(@inject(InjectionKeys.UserSessionRepository) userSessionRepository: IUserSessionRepository){
        this.userSessionRepository = userSessionRepository;
    }

    public isAuthenticated(): boolean {
        const session = this.userSessionRepository.getSession();
        
        if(session === null)
            return false;

        if(!this.isTokenExpired(session.dateExpiration))
            return true;
        
        this.userSessionRepository.clearSession();

        return false;
    }

    public logout(): void {
        this.userSessionRepository.clearSession();
    }

    private isTokenExpired(expirationDate: Date): boolean {
        const now = new Date();
        const expiration = new Date(expirationDate);
        return expiration.getTime() < now.getTime();
    }
}