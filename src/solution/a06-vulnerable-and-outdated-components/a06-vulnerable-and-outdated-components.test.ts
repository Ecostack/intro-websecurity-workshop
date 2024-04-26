import {describe, test} from 'node:test';
import assert from "node:assert";
import fs from "fs";
import {testLatency} from "./a06-vulnerable-and-outdated-components";

describe('a06-vulnerable-components', () => {
    test('systeminfo', async () => {
        const filePath = __dirname + '/some_random_file.txt'
        try {
            const filePath = __dirname + '/some_random_file.txt'
            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath)
            }

            await testLatency(`\`touch ${filePath}\``)
            if (fs.existsSync(filePath)) {
                assert.fail('Should not exist')
            }
        } finally {
            // if (fs.existsSync(filePath)) {
            //     fs.rmSync(filePath)
            // }
        }
    })
})
