import {describe, test} from "node:test";
import {checkPassword, checkPasswordInsecure, generateHash, generateHashInsecure} from "./crypto-graphic-failures";
import assert from "node:assert";

describe('a02-cryptographic-failures', () => {
  test('hash insecure', () => {
    const got = generateHashInsecure('password')
    const wanted = '5f4dcc3b5aa765d61d8327deb882cf99'
    assert.equal(wanted, got)
  })

  test('check password insecure', () => {
    const hashedPassword = '5f4dcc3b5aa765d61d8327deb882cf99'
    const got = checkPasswordInsecure('password',hashedPassword)
    const wanted = true
    assert.equal(wanted, got)
  })

  test('hashing', async () => {
    const got = await generateHash('password')
    const wanted = '$2b$10$JnNvIKsQskd9XYFK69IkIOvcY1t3MC4xzHpMmTKX.DOHKGFamb8Zm'
    assert.notEqual(wanted, got)
  })

  test('check password', async () => {
    const hashedPassword = '$2b$10$JnNvIKsQskd9XYFK69IkIOvcY1t3MC4xzHpMmTKX.DOHKGFamb8Zm'
    const got = await checkPassword('password', hashedPassword)
    const wanted = true
    assert.equal(wanted, got)
  })

  test('generate and check', async () => {
    const hashed = await generateHash('password')
    const got = await checkPassword('password',hashed)
    const wanted = true
    assert.equal(wanted, got)
  })
})
