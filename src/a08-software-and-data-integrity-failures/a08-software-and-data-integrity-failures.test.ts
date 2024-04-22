import {describe, test} from 'node:test';
import request from "supertest";
import {getServer} from "./a08-software-and-data-integrity-failures";

describe('a08-software-and-data-integrity-failures', () => {
    test('check root endpoint', async () => {
        await request(getServer()).get('/').expect(200).expect('hello world');
    })

    test('check secret endpoint with auth', async () => {
        await request(getServer()).get('/secret-endpoint').auth('admin', 'secret-password').expect(200).expect("The answer is 42");
    })

    test('check secret endpoint without auth', async () => {
        await request(getServer()).get('/secret-endpoint').expect(401)
    })

    test('load module allowed', async () => {
        await request(getServer()).get('/load-module/'+encodeURIComponent('allowed.js')).expect(200)
    })

    test('load module disallowed', async () => {
        await request(getServer()).get('/load-module/'+encodeURIComponent('disallowed.js')).expect(500)
    })
})
