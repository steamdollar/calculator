import express from 'express'
import {sequelize, setUpDatabase} from './db/index'
import cors from 'cors'


require('dotenv').config()

const app = express()

// db sync
setUpDatabase(sequelize)


// received data parsing optionss
app.use(cors({ origin: process.env.FRONTEND_ADDRESS, credentials: true}))
app.use(express.json())


// routers..
app.get('/', (req, res)=> {
    res.send('hello calculator')
})

app.post('/as', (req, res) => {
    console.log(req.body)
    const tradingInfo = req.body

    const response = {
        status : "success"
    }
    res.json(response)
})

app.post("/testdb", (req, res) => {
    console.log("q")
    
})

app.listen(process.env.BACKEND_PORT, async () => {
    try {
        await sequelize.sync({force : false})
    } catch (e) {
        console.log(e)
    }
    console.log(`calculator backend running at port :`, process.env.BACKEND_PORT)
})