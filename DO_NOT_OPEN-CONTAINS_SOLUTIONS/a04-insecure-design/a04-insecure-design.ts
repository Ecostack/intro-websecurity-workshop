import express from 'express'
import {readFile} from "node:fs/promises";


export function getServer() {
    const app = express()

    app.use(express.json())

    app.use('/static',express.static(__dirname + '/data/public/'))

    // app.get('/static/:file', async (req: express.Request<{ file: string }>, res) => {
    //     // TODO Prevent directory traversal attacks by checking if the file path contains '..'
    //     // Check the express documentation  on how to prevent this https://expressjs.com/en/starter/static-files.html
    //     // See more info here: https://cwe.mitre.org/data/definitions/73.html CWE-73: External Control of File Name or Path
    //
    //     try {
    //         // console.log(__dirname + '/data/public/' + req.params.file)
    //         // const data = await readFile(__dirname + '/data/public/' + req.params.file)
    //
    //
    //         res.send(data)
    //     } catch (e) {
    //         if (e.code === 'ENOENT') {
    //             res.status(404).send('Not Found')
    //             return
    //         }
    //         console.error(e)
    //         res.status(500).send('Server Error')
    //     }
    // })

    // Anti-Bot buying of products

    let purchasesByUserId = new Map<string, number>()

    app.post('/purchase/:id', (req, res) => {
        // TODO Prevent abuse by limiting the number of purchases a user can make
        // See more info here: https://cwe.mitre.org/data/definitions/770.html CWE-770: Allocation of Resources Without Limits or Throttling
        // Return 429 if the user has made more than 2 purchases

        const userId = req.body.userId
        const quantity = req.body.quantity

        if (purchasesByUserId.has(userId) && purchasesByUserId.get(userId) + 1 > 2) {
            res.status(429).send('Too many requests')
            return
        }

        if (purchasesByUserId.has(userId)) {
            purchasesByUserId.set(userId, purchasesByUserId.get(userId)! + quantity)
        } else {
            purchasesByUserId.set(userId, quantity)
        }



        res.sendStatus(200)
    })


    // Cinema bookings

    const bookings = [];

    const maximumAttendees = 100

    app.post('/book', (req, res) => {
        const {cinemaId, numberOfAttendees} = req.body;
        // TODO Redesign the booking system in a way to not allow mass booking without required deposits
        // https://cwe.mitre.org/data/definitions/307.html
        // if (numberOfAttendees > 15) {
            if (!req.body.depositPaid) {
                // return res.status(400).json({message: "A deposit is required for groups larger than 15."});
                return res.status(400).json({message: "A deposit is required."});
            }
        // }

        const currentBookedSeats = bookings.reduce((previousValue, currentValue) => previousValue + currentValue.numberOfAttendees, 0)

        if (currentBookedSeats + numberOfAttendees > maximumAttendees) {
            return res.status(400).json({message: "Not enough seats available"});
        }

        // Simulate booking process
        bookings.push({cinemaId, numberOfAttendees});
        return res.status(201).json({message: 'Booking successful'});
    });

    return app
}
