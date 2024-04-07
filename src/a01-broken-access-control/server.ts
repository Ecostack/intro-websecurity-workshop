import express from 'express'
const app = express()

const userAuths = {
    'SomeRandomTokenUser': 'user',
    'SomeRandomTokenAdmin': 'admin'
}

const bookData:Record<number, {userId:string, someValue:string}> = {
    1: {
        userId:'user',
        someValue:'Some book A'
    },
    2: {
        userId:'admin',
        someValue:'Some book B'
    }
}

app.get('/', (req:express.Request<{id:string}>, res) => {
    res.send('hello world')
})

app.get('/book/:id', (req:express.Request<{id:string}>, res) => {
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
    res.send(book)
})

export function getServer() {
    return app
}
