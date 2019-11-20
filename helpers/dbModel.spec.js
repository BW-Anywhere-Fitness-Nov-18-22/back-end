const db = require('../config/dbConfig');
const request = require('supertest')
const Users = require('./dbModel');

describe('Users', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('Add new user', () => {
        it('Should be empty', async () => {
            let users = await db('users');
            expect(users).toHaveLength(0);
        })
        it('Should add a specific user to database', async () => {
            let users = await Users.add({ firstname: 'Femi' });
            expect(users.firstname).toBe('Femi');
        })
    })
})


describe('Classes', () => {
    beforeEach(async () => {
        await db('classes').truncate();
    });

    describe('Add new class', () => {
        it('Should be empty', async () => {
            let classes = await db('classes');
            expect(classes).toHaveLength(0);
        })
    })
})