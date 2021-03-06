import express from 'express'
import jwt from 'jsonwebtoken';
import { currentUser } from '@microserviceticketing/common';
//import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser',currentUser,(req,res)=>{
    return res.send({currentUser:req.currentUser || null});

})
export {
    router as currentUserRouter
}