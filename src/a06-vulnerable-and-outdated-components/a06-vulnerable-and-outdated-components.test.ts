import {describe, test} from 'node:test';
import assert from "node:assert";
import si from "systeminformation";
import fs from "fs";

describe('a06-vulnerable-components', () => {
    test('systeminfo', async () => {
        const filePath = __dirname + '/some_random_file.txt'
        try {
            // TODO fix the vulnerability, maybe there is an update available?
            // https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26274
            const filePath = __dirname + '/some_random_file.txt'
            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath)
            }

            await si.inetLatency(`\`touch ${filePath}\``)
            if (fs.existsSync(filePath)) {
                assert.fail('Should not exist')
            }
        } finally {
            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath)
            }
        }
    })
})
