import express from 'express'
import bodyParser from "body-parser";

export interface CustomLogger {
    log: (message:string) => void
}

export function getServer(logger:CustomLogger) {

    const app = express()

    app.use(bodyParser.json())

    app.post('/pay', (req:express.Request, res) => {
        // TODO practise safe logging, remove sensitive data before logging
        // see https://cwe.mitre.org/data/definitions/532.html
        // CWE-117: Improper Output Neutralization for Logs
        // only log the event, not the details

        logger.log(JSON.stringify(req.body))

        res.send('Payment received')
    })

    app.post('/login', (req:express.Request, res) => {
        // TODO practise safe logging, remove sensitive data before logging
        // see https://cwe.mitre.org/data/definitions/532.html
        // same as above, only log the event, not the details
        logger.log(JSON.stringify(req.body))

        // TODO log the event
        // see https://cwe.mitre.org/data/definitions/778.html
        // log the event of a user logging in, check the test case for exact format
        res.send('Logged in')
    })

    return app
}
