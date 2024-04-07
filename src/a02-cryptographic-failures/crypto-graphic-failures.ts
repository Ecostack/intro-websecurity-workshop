import crypto from "crypto";
import bcrypt from "bcrypt";

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
    // see https://www.npmjs.com/package/bcrypt
    // return await bcrypt.hash(password, BCRYPT_ROUNDS)
    throw new Error('not implemented')
}

export async function checkPassword(password: string, hash: string) {
    // TODO use a secure hash function, like bcrypt
    // see https://www.npmjs.com/package/bcrypt
    // return await bcrypt.compare(password, hash)
    throw new Error('not implemented')
}
