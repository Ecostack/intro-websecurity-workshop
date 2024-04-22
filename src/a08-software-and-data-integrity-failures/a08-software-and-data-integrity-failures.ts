import express from 'express'

export function getServer() {

    const app = express()


    app.get('/', (req:express.Request, res) => {
        res.send('hello world')
    })

    // TODO Prevent users from accessing the secret endpoint, maybe add some authentication?
    // Check here for more info https://cwe.mitre.org/data/definitions/287.html
    app.get('/secret-endpoint', (req:express.Request, res) => {
        res.send("The answer is 42")
    })

    app.get('/load-module/:moduleName', (req:express.Request<{moduleName:string}>, res) => {
        const moduleName = req.params.moduleName;
        // TODO Prevent users from loading arbitrary modules
        // see https://cwe.mitre.org/data/definitions/829.html
        // Insecure: Dynamically loading a module based on user input
        // return 500 error in case of failure

        const path = './modules/'+moduleName
        try {
            const module = require(path);
            res.send(`Module ${moduleName} loaded successfully.`);
        } catch (error) {
            res.status(500).send(`Failed to load module: ${error.message}`);
        }
    });

    return app
}
