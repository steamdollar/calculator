import express  from 'express'
import { sequelize, setUpDatabase } from './db/index'
import cors from 'cors'
import {Trading} from './db/models/trading'
import { response } from './@types/response'
import { makeResponse } from './utils/response'

require('dotenv').config()

const app = express()

// db sync
setUpDatabase(sequelize)

// received data parsing optionss
app.use(cors({ origin: process.env.FRONTEND_ADDRESS, credentials: true }))
app.use(express.json())


// routers..
app.get('/', (req, res) => {
    res.send('hello calculator')
})

app.post('/saveTradingData', async (req, res) => {
    let response : response
    try {
        const {posi : position, loss : tolerance, entry, stopLoss : sl, takeProfit : tp, ticker } = req.body 
        await Trading.create({
            date : Date.now(),
            position,
            tolerance,
            entry,
            sl,
            tp,
            ticker
        })
        response = makeResponse(true, "successfully saved in db")

    } catch (e) {
        console.log(e)
        response = makeResponse(false, "failed to save data in db")
    } finally {
        res.json(response)
    }
})

app.listen(process.env.BACKEND_PORT, async () => {
    try {
        await sequelize.sync({ force: true })
    } catch (e) {
        console.log(e)
    }
    console.log(`calculator backend running at port :`, process.env.BACKEND_PORT)
})