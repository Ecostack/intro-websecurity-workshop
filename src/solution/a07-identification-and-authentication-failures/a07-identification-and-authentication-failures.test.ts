import {describe, test} from 'node:test';
import assert from "node:assert";
import fs from "fs";
import *  as esprima from 'esprima'
import request from "supertest";
import {getServer} from "./a07-identification-and-authentication-failures";

describe('a07-identification-and-authentication-failures', () => {
    describe('CWE-259: Use of Hard-coded Password', () => {
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
                        if ((declaration.id as any).name === 'passwordDB') {
                            foundPasswordDefinition = true
                            passwordIsString = typeof (declaration.init as any).value === 'string'
                        }
                    }
                }
            }
            assert.ok(foundPasswordDefinition, 'passwordDB variable not found')
            assert.ok(!passwordIsString, 'passwordDB is a string')
        })
    })
    describe("CWE-307: Improper Restriction of Excessive Authentication Attempts", () => {
        test('successful login', async () => {
            await request(getServer()).post('/login').send({username: 'admin', password: 'the answer is 42'})
                .expect(200)
        })
        test('failed login', async () => {
            await request(getServer()).post('/login').send({username: 'admin', password: 'password'})
                .expect(401)
        })

        test('failed login multiple times should rate limit', async () => {
            const server = request(getServer())
            async function failLogin() {
                await server.post('/login').send({username: 'admin', password: 'password'})
                    .expect(401)
            }

            for (let i = 0; i < 100; i++) {
                await failLogin()
            }

            // Attempt 100 should be rate limited
            await server.post('/login').send({username: 'admin', password: 'password'})
                .expect(429, 'Too many requests, please try again later.')

        })
    })
})
