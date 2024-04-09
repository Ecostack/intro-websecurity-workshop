import express from 'express'
import bodyParser from "body-parser";

export interface CustomLogger {
    log: (message:string) => void
}

export function getServer(logger:CustomLogger) {

    const app = express()

    app.use(bodyParser.json())

    app.post('/login', (req:express.Request, res) => {
        // TODO practise safe logging, remove sensitive data before logging
        // see https://cwe.mitre.org/data/definitions/532.html
        logger.log(JSON.stringify(req.body))
        res.send('Logged in')
    })

    return app
}
