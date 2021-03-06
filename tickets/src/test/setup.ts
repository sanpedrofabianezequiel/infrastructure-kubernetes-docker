import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import 'ts-jest';


declare global {
    var signin: () => Promise<string[]>;
}




let mongo: MongoMemoryServer;
beforeAll(async()=>{
    process.env.JWT_KEY ='123456';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri =  await mongo.getUri();

    await mongoose.connect(mongoUri);
}); 

beforeEach(async ()=>{
    const collections = await mongoose.connection.db.collections();

    for (let iterator of collections) {
        await iterator.deleteMany({});
    }
});


afterAll(async()=>{
    await mongoose.connection.close();
    await mongo.stop()
})

global.signin = () => {
    // Build a JWT payload.  { id, email }
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    };
  
    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);
  
    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };
  
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
  
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
  
    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
  };
  