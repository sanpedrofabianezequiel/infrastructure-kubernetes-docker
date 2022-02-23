import express from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import 'express-async-errors';
import mongoose from 'mongoose';


const app = express();
app.use(json());


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async(req,res,next)=>{
    //next( new NotFoundError());
    throw new NotFoundError();
    //we need import 'express-async-errors';

})

app.use(errorHandler );

const start = async ()=>{
    try {
        
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connection to MongoDb')
    } catch (error) {
        console.log(error);
    }
    
    app.listen(3000,()=>{
        console.log('Listening 3000')
    });
};

start();


