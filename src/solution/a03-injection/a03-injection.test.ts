import {describe, test} from 'node:test';
import {getDatabase, getServer} from "./a03-injection";
import request from "supertest";

describe('a03-injection', () => {
    describe("CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')", () => {
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
                .expect([{id: 2, owner: 'admin', name: 'Some book B'}]);
        })

        test('should get no book', async () => {
            const db = await getDatabase()
            await request(getServer(db)).get(`/books?name=Some book A" OR 1=1;--`).set('x-auth-token', 'SomeRandomTokenUser')
                .expect(200)
                .expect([]);
        })
    })

    describe("CWE-80: Improper Neutralization of Script-Related HTML Tags in a Web Page (Basic XSS)", () => {
        test('should render template with default name', async () => {
            const db = await getDatabase()
            const response = await request(getServer(db)).get(`/`)
                .expect(200)
            if (!response.text.includes('Hi my name is Testuser')) {
                throw new Error("Rendering of template not working")
            }
        })
        test('should render template with parameter', async () => {
            const db = await getDatabase()
            const response = await request(getServer(db)).get(`/`).query({name: 'Mallory'})
                .expect(200)
            if (!response.text.includes('Hi my name is Mallory')) {
                throw new Error("Rendering of template not working")
            }
        })
        test('should escape parameters in template', async () => {
            const db = await getDatabase()
            const response =  await request(getServer(db)).get(`/`).query({name: '<script>alert("XSS")</script>'})
                .expect(200)
            if (!response.text.includes('Hi my name is &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;')) {
                throw new Error("Should contain escaped string")
            }
        })
    })
})
