import {describe, test} from 'node:test';
import request from "supertest";
import {getServer} from "./a10-server-side-request-forgery";

describe('a10-server-side-request-forgery', () => {
    test('fetching data from allowed URL', async () => {
        await request(getServer()).post('/fetch-data').send({url:"https://baidu.com"}).expect(200);
    })

    test('should not fetch data from internal URL', async () => {
        await request(getServer()).post('/fetch-data').send({url:"http://salary-account-internal-system"}).expect(500);
    })
})
