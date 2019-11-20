const request = require('supertest');
const server = require('../../api/server');

describe('Auth Routes', () => {
    describe('register endpoint', () => {
        it('validateBody middleware works', ()=> {
            return request(server).post('/api/auth/register')
                .expect(400)
                .expect({ message: 'Please supply data in the request body!' })
        });

        it('validateEmail middleware works', ()=> {
            return request(server).post('/api/auth/register')
                .send({email: 'sandra', password: '1234'})
                .expect(400)
                .expect({ message: 'Not a valid email address format' })
        });

        it('validateUser middleware works', ()=> {
            return request(server).post('/api/auth/register')
                .send({email: 'sandra@gmail.com', password: '1234'})
                .expect(400)
                .expect({ message: 'You are missing some required fields!' })
        });

        it('endpoint works with valid details', ()=> {
            return request(server).post('/api/auth/register')
                .send({firstName: 'Sandra', lastName: 'philips', email: 'karim@gmail.com', password: '1234',  role: 'instructor'})
                .expect(201)
                
        });
    });

    describe('login endpoint', () => {
        it('validateBody middleware works', ()=> {
            return request(server).post('/api/auth/login')
                .expect(400)
                .expect({ message: 'Please supply data in the request body!' })
        });

        it('validateEmail middleware works', ()=> {
            return request(server).post('/api/auth/login')
                .send({email: 'sandra', password: '1234'})
                .expect(400)
                .expect({ message: 'Not a valid email address format' })
        });

        it('validateUser middleware works', ()=> {
            return request(server).post('/api/auth/login')
                .send({email: 'sandraa@gmail.com', password: '1234'})
                .expect(401)
                .expect({ message: 'Oops! Invalid Credentials' })
        });

        it('endpoint works with valid details', ()=> {
            return request(server).post('/api/auth/login')
                .send({email: 'sandra@gmail.com', password: '1234'})
                .expect(200)
                
        });

    })
    
})