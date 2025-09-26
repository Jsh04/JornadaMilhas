import { inject, injectable } from "inversify";
import type IUserSessionRepository from "../../domain/repositories/IUserSessionRepository";

@injectable()
export default class AuthorizationService{

    private readonly userSessionRepository: IUserSessionRepository;
    
    constructor(@inject() userSessionRepository: IUserSessionRepository){
        this.userSessionRepository = userSessionRepository;
    }
}