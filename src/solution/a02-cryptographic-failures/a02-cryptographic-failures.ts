import crypto from "crypto";
import bcrypt from "bcrypt";


// TODO set the number of rounds to use for bcrypt
// See https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html for guidance
// see https://cwe.mitre.org/data/definitions/326.html
const BCRYPT_ROUNDS = 10

export function generateHashInsecure(password: string): string {
    const hash = crypto.createHash('md5')
    hash.update(password, 'utf8')
    return hash.digest('hex')
}

export function checkPasswordInsecure(password: string, hash: string): boolean {
    return generateHashInsecure(password) === hash
}

export async function generateHash(password: string): Promise<string>{
    // TODO use a secure hash function, like bcrypt
    // see https://www.npmjs.com/package/bcrypt#to-hash-a-password on how to generate the hash

    return await bcrypt.hash(password,BCRYPT_ROUNDS)
}

export async function checkPassword(password: string, hash: string) {
    // TODO use a secure hash function, like bcrypt
    // see https://www.npmjs.com/package/bcrypt#to-check-a-password on how to compare clear text with the hash

    return bcrypt.compare(password, hash)
}
