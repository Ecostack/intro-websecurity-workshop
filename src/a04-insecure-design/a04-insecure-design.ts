import express from 'express'
import {readFile} from "node:fs/promises";


export function getServer() {
    const app = express()

    app.get('/static/:file', async (req: express.Request<{ file: string }>, res) => {
        // TODO Prevent directory traversal attacks by checking if the file path contains '..'
        // Check the express documentation for how to do this https://expressjs.com/en/starter/static-files.html
        // See more info here: https://cwe.mitre.org/data/definitions/73.html CWE-73: External Control of File Name or Path

        try {
            console.log(__dirname+'/data/public/' + req.params.file)
            const data = await readFile(__dirname+'/data/public/' + req.params.file)
            res.send(data)
        } catch (e) {
            if (e.code === 'ENOENT') {
                res.status(404).send('Not Found')
                return
            }
            console.error(e)
            res.status(500).send('Server Error')
        }
    })



    return app
}
