


import express from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";


// TODO Fix the use of hard-coded passwords, see https://cwe.mitre.org/data/definitions/259.html
// Maybe we can set the password in a more dynamic way, which allows for easier rotation

const usernameDB = "admin";
const passwordDB = "MyAmazingPassword";

export function setupDBConnection() {
    const connectionString = `mongodb://${usernameDB}:${passwordDB}@localhost:27017/mydb`;
    console.log(`Connecting to ${connectionString}`)
}


export function getServer() {
    const app = express()
    app.use(bodyParser.json())

    const username = 'admin'
    const password = 'the answer is 42'

    // TODO Implement rate limiting on login, see https://cwe.mitre.org/data/definitions/307.html
    // see here on how to implement the express-rate-limit https://express-rate-limit.mintlify.app/quickstart/usage

    app.post('/login', async (req, res) => {

        if(req.body.username !== username || req.body.password !== password) {
            res.status(401).send('Unauthorized')
            return
        }

        res.cookie('user', req.body.username)
        res.send('Successfully logged in')
    })

    return app
}
