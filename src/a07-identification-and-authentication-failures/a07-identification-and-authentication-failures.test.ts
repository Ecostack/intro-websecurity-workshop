import {describe, test} from 'node:test';
import assert from "node:assert";
import fs from "fs";
import *  as esprima from 'esprima'

describe('a07-identification-and-authentication-failures', () => {
    test('check password hardcoded', async () => {
        const filePath = __dirname + '/a07-identification-and-authentication-failures.ts'
        const fileContent = fs.readFileSync(filePath, 'utf8')
        console.log(fileContent)

        const result = esprima.parseModule(fileContent)

        let foundPasswordDefinition = false
        let passwordIsString = false

        for (const node of result.body) {
            if (node.type === 'VariableDeclaration') {
                for (const declaration of node.declarations) {
                    if ((declaration.id as any).name === 'password') {
                        foundPasswordDefinition = true
                        passwordIsString = typeof (declaration.init as any).value === 'string'
                    }
                }
            }
        }
        assert.ok(foundPasswordDefinition)
        assert.ok(!passwordIsString)
    })
})
