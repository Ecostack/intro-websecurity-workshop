import express from 'express'

import crypto from 'crypto'

function encryptValue(text: string) {
    const algorithm = 'aes-256-gcm'; // Use AES 256-bit encryption
    const key = crypto.randomBytes(32); // Generate a random 32-byte key
    const iv = crypto.randomBytes(16); // Generate a random 16-byte IV

    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(Buffer.from(text));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}
function encryptText(text:string) {
    const {iv,encryptedData } = encryptValue(text)
    return encryptedData+":"+iv
}

function encryptCookieValue(text: string) {
    // TODO 1: Prevent the user ID to be clear text in the cookie
    // Hide the value from the client
    // Maybe we can use synchronous encryption here? Maybe there is a function here that can help us?
    // See more info here: https://cwe.mitre.org/data/definitions/315.html

    return text
}

export function getServer() {
    const app = express()

    app.get('/cookiejar', async (req: express.Request<{ file: string }>, res) => {
        // TODO 2: Set the HTTPOnly flag to prevent XSS from obtaining the cookie
        // for example res.cookie('secret-key','my-secret-key', {httpOnly:true})
        // See more info here: https://cwe.mitre.org/data/definitions/1004.html

        res.cookie('user', encryptCookieValue("user-id-123"))
        res.send('Cookie set')
    })

    app.get('/sample-error', (req, res) => {
        // TODO Do not expose error messages to the client, this can be used to gather information about the server
        // Change the return value to be a generic message, like Internal Server Error
        // Check https://cwe.mitre.org/data/definitions/209.html
        try {
            throw new Error('Failed to connect to MySQL using mysql://user:password@localhost:3306/database')
        } catch (e) {
            console.error(e)
            res.status(500).send(e.message)
        }
    })

    return app
}
