import express , {Request,Response} from 'express'
import { body,validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest,BadRequestError } from '@microserviceticketing/common';

const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:4, max:20}).withMessage('Password must be between 4 an 20 characters'),
 
],
validateRequest,
async(req : Request | any,res: Response)=>{
    
    
    const { email,password } = req.body  ;
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new BadRequestError('Email in use');
        //return res.send({});
    }

    const user = User.build({email,password});
    await user.save();

    const userJwt = jwt.sign({
        id:user.id,
        email:user.email
    },process.env.JWT_KEY!)

    //req.session.jwt = value === undefined 
    req.session = {
        jwt: userJwt
    }

    return res.status(201).send(user);

}) 
export {
    router as signupRouter
}