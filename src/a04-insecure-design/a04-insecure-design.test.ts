import {describe, test} from 'node:test';
import {getServer} from "./a04-insecure-design";
import request from "supertest";
import assert from "node:assert";

describe('a04-insecure-design', () => {
    test('get public file', async () => {
        await request(getServer()).get('/static/public.txt')
            .expect(200)
    })

    test('cannot find a file that does not exist', async () => {
        await request(getServer()).get('/static/..%2Fsecret%2FDoesNotExist.txt')
            .expect(404)
    })

    test('should not find password file', async () => {
        await request(getServer()).get('/static/..%2Fsecret%2Fpassword.txt')
            .expect(404)
    })

    // TODO ME - add test case for cinema multi booking
})
