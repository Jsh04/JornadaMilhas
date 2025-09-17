import type IError from "./IError"

export default class Result<T> {
    private readonly _isSuccess: boolean
    private readonly _error?: IError
    private readonly _data?: T

    private constructor(isSuccess: boolean, data?: T, error?: IError) {
        this._isSuccess = isSuccess
        this._error = error;
        this._data = data;
    }

    get isSuccess(): boolean {
        return this._isSuccess;
    }

    get isFailure(): boolean {
        return !this._isSuccess;
    }
    get value(): T {
        if (!this._isSuccess) 
            throw new Error("Cannot get value from a failed result");
        
        return this._data as T;
    }
    get error(): IError {
        if (this._isSuccess) 
            throw new Error("Cannot get error from a successful result");
        
        return this._error as IError;
    }

    static ok<T>(dataSucess: T) {
        return new Result<T>(true, dataSucess)
    }

    static fail<T>(error: IError): Result<T> {
        return new Result<T>(false, undefined, error);
    }
    
}