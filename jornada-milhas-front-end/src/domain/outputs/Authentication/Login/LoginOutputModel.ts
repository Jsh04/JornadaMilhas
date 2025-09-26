import type UserSessionOutPutModel from "./UserSessionOutputModel";

export default interface LoginOutputModel{
    token: string,
    user: UserSessionOutPutModel,
    dateExpiration: Date
}

