import {describe, test} from 'node:test';
import {getServer} from "./a04-insecure-design";
import request from "supertest";
import assert from "node:assert";

describe('a04-insecure-design', () => {
    describe("CWE-73: External Control of File Name or Path", () => {
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
    })

    describe('CWE-770: Allocation of Resources Without Limits or Throttling',()=>{
        test('Anti-Bot/scalper - Ensure rate limiting is enforced', async () => {
            const server = getServer()
            const responses = [];
            for (let i = 0; i < 10; i++) {
                responses.push(request(server).post('/purchase/1').send({ userId:'897fec1c-2253-41d4-ad45-a624f47a125f', quantity: 1 }));
            }

            const results = await Promise.all(responses);
            assert.equal(results.filter(r => r.statusCode === 429).length, 8, 'Expected 8 429 response');
        });
    })
    describe('Cinema Booking Security Tests', () => {
        test('More than 15 seats requires deposit', async () =>{
            const server = getServer()
            await request(server).post('/book').send({
                cinemaId: 1,
                numberOfAttendees: 16,
                depositPaid: false
            }).expect(400)
        })

        test('Booking too many seats result in error', async () =>{
            const server = getServer()

            for (let i = 0; i < 10; i++) {
                await request(server).post('/book').send({
                    cinemaId: 1,
                    numberOfAttendees: 10,
                    depositPaid: true
                }).expect(201)
            }

            await request(server).post('/book').send({
                cinemaId: 1,
                numberOfAttendees: 2,
                depositPaid: true
            }).expect(400)
        })

        test('Prevent mass booking without required deposits', async () => {
            const server = getServer()

            const numberOfBookings = 10;
            const seatsPerBooking = 10; // Less than 15 to simulate small group bookings

            const bookings = Array.from({ length: numberOfBookings }, () =>
                request(server).post('/book').send({
                    cinemaId: 1,
                    numberOfAttendees: seatsPerBooking,
                    depositPaid: false // Intentionally not paying deposit to test rejection
                })
            );

            const responses = await Promise.all(bookings);

            for (const respons of responses) {
                assert.equal(respons.statusCode, 400, 'Expected 400 status code');
                assert.equal(respons.body.message, 'deposit is required', 'Expected deposit is required message');
            }

        });
    })
})
