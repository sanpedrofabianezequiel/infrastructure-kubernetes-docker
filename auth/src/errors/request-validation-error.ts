import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";


export class RequestValidationError extends CustomError {
    statusCode = 400;
    public errors: ValidationError[];
    constructor( _errors: ValidationError[]){
        super('Invalid request parameters');
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