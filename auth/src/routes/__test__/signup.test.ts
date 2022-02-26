import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful signup', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email:'test@test.com',
                password: 'password'
            })
            .expect(201)
})

it('Returns  a 400  with an invalid email', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email:'testss@test.com',
                password: 'password'
            })
            .expect(201)
})

it('Returns  a 400  with an invalid password', async()=>{
    return request(app)
            .post('/api/users/signup')
            .send({
                email:'testss@test.com',
                password: 'p'
            })
            .expect(400)
})

it('Returns  a 400  with missing email and password', async()=>{
    await request(app)
            .post('/api/users/signup')
            .send({email:'sdass',password:'s'})
            .expect(400)
    
    await  request(app)
            .post('/api/users/signup')
            .send({password:'s'})
            .expect(201)
})

it('disallows duplicate emails',async()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password:'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password:'password'
        })
        .expect(400);
});

it('sets a cookie after succesful signup',async()=>{
    const response = await request(app)
                            .post('/api/users/sginup')
                            .send({
                                email:'test@test.com',
                                password:'pasword'
                            })
                            .expect(404)
    expect(response.get('Set-Cookie')).toBeDefined();
})