import express , {Request,Response} from 'express'
import { body,validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';


const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:4, max:20}).withMessage('Password must be between 4 an 20 characters'),
 
], (req : Request | any,res: Response)=>{
    const erros = validationResult(req);
    console.log("singup",erros);
    if(!erros.isEmpty()){
        throw new RequestValidationError(erros.array());
    }
    

    

   const {email,password} = req.body; 

    res.send(erros)

}) 
export {
    router as signupRouter
}