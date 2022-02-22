export class DatabaseConnectionError extends Error {
    statusCode= 500;
    raason  = 'Error connection to Database';

    constructor(){
        super();
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [{message:this.raason}];
    }
}