import type IError from "./IError"
import ResultBase from "./ResultBase";

class ResultValue<T> extends ResultBase {
    
    private readonly _data?: T

    
    constructor(isSuccess: boolean, data?: T, error?: IError){
        super(isSuccess, error);
        this._data = data;
    }
   
    get value(): T {
        if (super.isSuccess) 
            throw new Error("Cannot get value from a failed result");
        
        return this._data as T;
    }
  
    static ok<T>(dataSucess: T) {
        return new ResultValue<T>(true, dataSucess)
    }

    static fail<T>(error: IError): ResultValue<T> {
        return new ResultValue<T>(false, undefined, error);
    }

}

class Result extends ResultBase{

    constructor(isSuccess: boolean, error?: IError){
        super(isSuccess, error);
    }
   
    static ok() {
        return new Result(true)
    }

    static fail(error: IError): Result {
        return new Result(false, error);
    }
}

export { Result, ResultValue }