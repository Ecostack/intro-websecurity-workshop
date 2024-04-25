import express from 'express'
import fs from "fs";
import crypto from "crypto";


export function signData(data: string) {
    const privateKey = fs.readFileSync('src/a08-software-and-data-integrity-failures/CWE-494/ed25519_private.pem', 'utf8');

    const sign = crypto.sign(null, Buffer.from(data), privateKey);
    return sign.toString('hex');
}

export function verifySignature(data: string, signatureHex: string = "") {
    const publicKey = fs.readFileSync('src/a08-software-and-data-integrity-failures/CWE-494/ed25519_public.pem', 'utf8');

    const isValid = crypto.verify(null, Buffer.from(data), publicKey, Buffer.from(signatureHex, 'hex'))

    return isValid
}

export function getServer() {

    const app = express()

    app.use(express.json())

    app.post('/update-firmware', (req, res) => {
        const {data, signature} = req.body
        // TODO Implement signature verification, use the verifySignature functions
        // CWE-494: Download of Code Without Integrity Check https://cwe.mitre.org/data/definitions/494.html
        // return 401 error in case of failure

        res.send('Firmware updated successfully.')
    })

    app.get('/load-module/:moduleName', (req: express.Request<{ moduleName: string }>, res) => {
        const moduleName = req.params.moduleName;
        // TODO Prevent users from loading arbitrary modules
        // see https://cwe.mitre.org/data/definitions/829.html
        // Insecure: Dynamically loading a module based on user input
        // return 500 error in case of failure

        const path = './modules/' + moduleName
        try {
            const module = require(path);
            res.send(`Module ${moduleName} loaded successfully.`);
        } catch (error) {
            res.status(500).send(`Failed to load module: ${error.message}`);
        }
    });

    return app
}
