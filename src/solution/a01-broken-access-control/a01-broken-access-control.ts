import express from 'express'


const userAuths = {
    'SomeRandomTokenUser': 'user',
    'SomeRandomTokenAdmin': 'admin'
}

const bookData: Record<number, { userId: string, someValue: string }> = {
    1: {
        userId: 'user',
        someValue: 'Some book A'
    },
    2: {
        userId: 'admin',
        someValue: 'Some book B'
    }
}

export function getServer() {
    const app = express()

    app.get('/book/:id', (req: express.Request<{ id: string }>, res) => {
        const authToken = req.headers['x-auth-token'] as string
        const bookId = req.params.id
        const user = userAuths[authToken]
        if (!user) {
            res.status(401).send('Unauthorized')
            return
        }
        const book = bookData[parseInt(bookId)]
        if (!book) {
            res.status(404).send('Not found')
            return
        }
        // TODO: Check if the user is allowed to access the book, check book data ownership, return 401 if not
        // see https://cwe.mitre.org/data/definitions/639.html
        if (book.userId != user){
            res.status(401).send('Unauthorized')
            return
        }

        res.send(book)
    })

    return app
}
