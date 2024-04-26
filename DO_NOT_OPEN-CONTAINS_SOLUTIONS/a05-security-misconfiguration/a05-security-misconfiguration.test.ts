import {describe, test} from 'node:test';
import {getServer} from "./a05-security-misconfiguration";
import request from "supertest";
import assert from "node:assert";

describe('a05-security-misconfiguration', () => {
    describe('CWE-315: Cleartext Storage of Sensitive Information in a Cookie', () => {
        test('check cookie does not contain clear text user ID', async () => {
            const response = await request(getServer()).get('/cookiejar')
                .expect(200)
            const cookies = response.get('Set-Cookie')
            assert.ok(cookies, 'No cookies found')
            const got = cookies[0]
            const wanted = 'user=123; Path=/'

            assert.notEqual(got, wanted)
        })
    })
    describe('CWE-1004: Sensitive Cookie Without \'HttpOnly\' Flag', () => {
        test('get a cookie', async () => {
            const response = await request(getServer()).get('/cookiejar')
                .expect(200)
            const cookies = response.get('Set-Cookie')
            assert.ok(cookies)
        })

        test('check cookie has http only', async () => {
            const response = await request(getServer()).get('/cookiejar')
                .expect(200)
            const cookies = response.get('Set-Cookie')
            assert.ok(cookies, 'No cookies found')
            if (!cookies[0].includes('HttpOnly')) {
                assert.fail('Cookie is not HttpOnly')
            }
        })
    })

    describe("CWE-209: Generation of Error Message Containing Sensitive Information", () => {
        test('should not find error log in response', async () => {
            const wanted = 'Internal Server Error'
            const response = await request(getServer()).get('/sample-error')
                .expect(500)
            const got = response.text

            assert.equal(got, wanted)
        })
    })
})
