import {describe, test} from 'node:test';
import request from "supertest";
import {CustomLogger, getServer} from "./a09-security-logging-and-monitoring-failures";
import assert from "node:assert";

class CustomLoggerImpl implements CustomLogger {
    logMessages:string[] = []
    log(message: string): void {
        this.logMessages.push(message)
        console.log(message)
    }
}

describe('a09-security-logging-and-monitoring-failures', () => {
    describe('CWE-778: Insufficient Logging', () => {
        test('login event should be logged', async () => {
            const logger = new CustomLoggerImpl()
            await request(getServer(logger)).post('/login').send({username:'admin',password:'secret'}).expect(200).expect("Logged in");

            assert.ok(logger.logMessages.length > 0, 'No log messages found')
            let foundLogin = false
            for (const loggerElement of logger.logMessages) {
                if (loggerElement.includes('Event: User Login')) {
                    foundLogin = true
                }
            }
            if (!foundLogin) {
                assert.fail('No login event found in logs')
            }
        })
    })

    describe('CWE-532: Insertion of Sensitive Information into Log File', () => {
        test('login should not contain password', async () => {
            const logger = new CustomLoggerImpl()
            await request(getServer(logger)).post('/login').send({username:'admin',password:'secret'}).expect(200).expect("Logged in");

            assert.ok(logger.logMessages.length > 0, 'No log messages found')
            for (const loggerElement of logger.logMessages) {
                if (loggerElement.includes('password')) {
                    assert.fail('Password found in logs')
                }
            }
        })

        test('payment log should not contain credit card number', async () => {
            const logger = new CustomLoggerImpl()
            await request(getServer(logger)).post('/pay').send({creditCard: "1234-5678-9012-3456"}).expect(200).expect("Payment received");

            assert.ok(logger.logMessages.length > 0, 'No log messages found')
            for (const loggerElement of logger.logMessages) {
                if (loggerElement.includes('1234-5678-9012-3456')) {
                    assert.fail('Credit card number found in logs')
                }
            }
        })
    })

})
