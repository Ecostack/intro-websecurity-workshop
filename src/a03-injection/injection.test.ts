import {describe, test} from 'node:test';
import {getDatabase, getServer} from "./injection";
import request from "supertest";

describe('a03-injection', () => {
    test('no auth should fail', async () => {
        const db = await getDatabase()
        await request(getServer(db)).get('/books')
            .expect(401)
    })

    test('get user book', async () => {
        const db = await getDatabase()
        await request(getServer(db)).get('/books').set('x-auth-token', 'SomeRandomTokenUser')
            .expect(200)
            .expect([{id: 1, owner: 'user', name: 'Some book A'}]);
    })

    test('get user book with filter', async () => {
        const db = await getDatabase()
        await request(getServer(db)).get('/books?name=Some book A').set('x-auth-token', 'SomeRandomTokenUser')
            .expect(200)
            .expect([{id: 1, owner: 'user', name: 'Some book A'}]);
    })

    test('get admin book', async () => {
        const db = await getDatabase()
        await request(getServer(db)).get('/books').set('x-auth-token', 'SomeRandomTokenAdmin')
            .expect(200)
            .expect([{id: 2, owner: 'admin', someValue: 'Some book B'}]);
    })

    test('should only get the user book', async () => {
        const db = await getDatabase()
        await request(getServer(db)).get(`/books?name=Some book A" OR 1=1;--`).set('x-auth-token', 'SomeRandomTokenUser')
            .expect(200)
            .expect([{id: 1, owner: 'user', name: 'Some book A'}]);
    })
})
