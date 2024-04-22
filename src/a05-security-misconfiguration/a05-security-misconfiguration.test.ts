import {describe, test} from 'node:test';
import {getServer} from "./a05-security-misconfiguration";
import request from "supertest";
import assert from "node:assert";

describe('a05-security-misconfiguration', () => {
    test('get a cookie', async () => {
        const response = await request(getServer()).get('/cookiejar')
            .expect(200)
        const cookies = response.get('Set-Cookie')
        assert.ok(cookies)
    })

    test('check cookie does not contain clear text user ID', async () => {
        const response = await request(getServer()).get('/cookiejar')
            .expect(200)
        const cookies = response.get('Set-Cookie')
        assert.ok(cookies)
        const got = cookies[0]
        const wanted = 'user=123; Path=/'

        assert.notEqual(got, wanted)
    })

    test('check cookie has http only', async () => {
        const response = await request(getServer()).get('/cookiejar')
            .expect(200)
        const cookies = response.get('Set-Cookie')
        assert.ok(cookies)
        if (!cookies[0].includes('HttpOnly')) {
            assert.fail('Cookie is not HttpOnly')
        }
    })
})
