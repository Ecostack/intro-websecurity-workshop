import express from 'express'
import sqlite3 from 'sqlite3'
import {Database, open} from 'sqlite'

export async function getDatabase() {
    const db = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    })

    await db.exec('CREATE TABLE book (id INTEGER PRIMARY KEY, owner TEXT, name TEXT)')
    await db.exec('INSERT INTO book (id,owner, name) VALUES (1,"user", "Some book A")')
    await db.exec('INSERT INTO book (id,owner, name) VALUES (2,"admin", "Some book B")')

    return db
}

export function getServer(db: Database) {
    const app = express()

    app.set('views', __dirname+'/views');
    app.set('view engine', 'pug')

    const userAuths = {
        'SomeRandomTokenUser': 'user',
        'SomeRandomTokenAdmin': 'admin'
    }


    app.get('/', (req, res) => {
        // TODO fix the XSS injection, have a look at the documentation of the pug package and how to escape variables
        // https://pugjs.org/api/getting-started.html
        // see https://cwe.mitre.org/data/definitions/80.html

        res.render('index', {title: 'Express', name: req.query.name || 'Testuser'})
    })

    app.get('/books', async (req: express.Request<{ id: string }>, res) => {
        try {
            const authToken = req.headers['x-auth-token'] as string
            const user = userAuths[authToken]
            if (!user) {
                res.status(401).send('Unauthorized')
                return
            }

            const nameFilter = req.query.name

            // TODO fix the SQL injection, check here https://www.npmjs.com/package/sqlite#prepared-statement
            // see https://cwe.mitre.org/data/definitions/89.html



            let query = `SELECT * FROM book WHERE owner LIKE ?`
            if (nameFilter) {
                query += ` AND name LIKE ?`
            }

            const stmt = await db.prepare(query)
            const params = {1:user}

            if (nameFilter) {
                params[2] = nameFilter
            }

            const result = await stmt.all(params)
            res.send(result)
        } catch (e) {
            console.error(e)
            res.status(500).send('Internal server error')
        }
    })
    return app
}
