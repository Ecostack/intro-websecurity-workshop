import express from 'express'


export function getServer() {
    const app = express()

    app.get('/cookiejar', async (req: express.Request<{ file: string }>, res) => {
        // TODO 1: Prevent the user ID to be clear text in the cookie
        // Find a way to make it readable to the server but not to the client
        // See more info here: https://cwe.mitre.org/data/definitions/315.html

        // TODO 2: Set the HTTPOnly flag to prevent XSS from obtaining the cookie
        // See more info here: https://cwe.mitre.org/data/definitions/1004.html

        res.cookie('user', '123')
        res.send('Cookie set')
    })


    return app
}
