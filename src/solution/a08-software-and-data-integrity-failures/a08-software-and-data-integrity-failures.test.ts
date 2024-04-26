import {describe, test} from 'node:test';
import request from "supertest";
import {getServer, signData} from "./a08-software-and-data-integrity-failures";

describe('a08-software-and-data-integrity-failures', () => {
    describe('CWE-494: Download of Code Without Integrity Check', () => {
        test('update firmware signed', async () => {
            const data = 'The new firmware update is available.'
            const signature = signData(data)

            await request(getServer()).post('/update-firmware').send({data, signature}).expect(200)
        })
        test('update firmware unsigned', async () => {
            const data = 'Malicious firmware update'
            await request(getServer()).post('/update-firmware').send({data}).expect(401)
        })
    })
    describe('CWE-829: Inclusion of Functionality from Untrusted Control Sphere', () => {
        test('load module allowed', async () => {
            await request(getServer()).get('/load-module/' + encodeURIComponent('allowed.js')).expect(200)
        })

        test('load module disallowed', async () => {
            await request(getServer()).get('/load-module/' + encodeURIComponent('disallowed.js')).expect(500)
        })
    })
})
