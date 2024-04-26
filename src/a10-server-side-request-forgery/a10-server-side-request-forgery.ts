import express from 'express'
import bodyParser from "body-parser";

export function getServer() {

    const app = express()

    app.use(bodyParser.json())

    async function customFetch(url: string) {
        console.log('Fetching data from', url)
        return {
            text: async () => {
                return 'Some data'
            }
        }
    }

    app.post('/fetch-data', async (req: express.Request, res) => {
        // TODO find a way to prevent Server-Side Request Forgery (SSRF) attacks
        // see https://cwe.mitre.org/data/definitions/918.html
        // maybe we can use a whitelist of allowed URLs?

        const {url} = req.body; // User-controlled input
        try {
            const response = await customFetch(url); // Insecure: Directly using user input to make a server-side request
            const data = await response.text();
            res.send(data);
        } catch (error) {
            console.error(error)
            res.status(500).send('Failed to fetch data.');
        }
    })

    return app
}
