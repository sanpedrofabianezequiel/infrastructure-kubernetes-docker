import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode= 500;
    raason  = 'Error connection to Database';

    constructor(){
        super('Error connection to Database');
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [{message:this.raason}];
    }
}