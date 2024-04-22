import {describe,test} from 'node:test';
import {getServer} from "./a01-broken-access-control";
import request from "supertest";

describe('a01-broken-access-control', () => {
    test('server result', async () => {
        await request(getServer()).get('/').expect(200).expect('hello world');
    })

    test('no auth should fail',async () => {
        await request(getServer()).get('/book/1')
            .expect(401)
    })

    test('get user book', async() => {
        await request(getServer()).get('/book/1').set('x-auth-token', 'SomeRandomTokenUser')
            .expect(200)
            .expect({userId:'user', someValue:'Some book A'});
    })

    test('get admin book', async() => {
        await request(getServer()).get('/book/2').set('x-auth-token', 'SomeRandomTokenAdmin')
            .expect(200)
            .expect({userId:'admin', someValue:'Some book B'});
    })

    test('should not get admin book as user', async() => {
        await request(getServer()).get('/book/2').set('x-auth-token', 'SomeRandomTokenUser')
            .expect(401);
    })
})
