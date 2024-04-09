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
    test('safe logging practise', async () => {
        const logger = new CustomLoggerImpl()
        await request(getServer(logger)).post('/login').send({username:'admin',password:'secret'}).expect(200).expect("Logged in");

        assert.ok(logger.logMessages.length > 0)
        for (const loggerElement of logger.logMessages) {
            if (loggerElement.includes('password')) {
                assert.fail('Password found in logs')
            }
        }
    })
})
