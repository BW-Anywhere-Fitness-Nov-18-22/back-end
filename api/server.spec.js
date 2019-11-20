const request = require('supertest')
const server = require('./server')


describe('GET /', () => {
    it('Should return 200', () => {
        return request(server).get('/').then(res => {
            expect(res.status).toBe(200);
        });
    });
})
