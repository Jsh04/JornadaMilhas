import type IError from "./IError"

export default abstract class ResultBase{
    protected readonly _isSuccess: boolean
    protected readonly _error?: IError

     get isSuccess(): boolean {
        return this._isSuccess;
    }

    get isFailure(): boolean {
        return !this._isSuccess;
    }

      get error(): IError {
        if (this._isSuccess) 
            throw new Error("Cannot get error from a successful result");
        
        return this._error as IError;
    }

    protected constructor(isSuccess: boolean, error?: IError) {
        this._isSuccess = isSuccess
        this._error = error;
        
    }
}  