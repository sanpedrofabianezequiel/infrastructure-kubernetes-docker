import { ValidationError } from "express-validator";


interface CustomError {
    statusCode: number;
    serializeErrors():{
        message:string;
        field?:string;
    }[];
}
export class RequestValidationError extends Error implements CustomError {
    statusCode = 400;
    public errors: ValidationError[];
    constructor( _errors: ValidationError[]){
        super();
        this.errors = _errors;

        //Only because we are extending built in class
        Object.setPrototypeOf(this,RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map(x=>{
            return {message: x.msg, field:x.param};
        })
    }
}