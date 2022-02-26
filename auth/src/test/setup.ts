import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app} from '../app';
import request from 'supertest';
import 'ts-jest';


declare global {
    var signin: () => Promise<string[]>;
}




let mongo: MongoMemoryServer;
beforeAll(async()=>{
    process.env.JWT_KEY ='123456';

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

global.signin = async()=>{
    const email = 'test@test.com';
    const password= 'password';

    const response = await request(app)
                        .post('/api/users/signup')
                        .send({
                            email,password
                        })
                        .expect(201)

    const cookie =  response.get('Set-Cookie');
    return cookie;
}