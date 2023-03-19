import express from 'express'
const app = express()
require('dotenv').config()
const cors = require('cors')

const backend_port = process.env.BACKEND_PORT

app.use(cors({ origin: process.env.FRONTEND_ADDRESS, credentials: true}))
app.use(express.json())

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

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`calculator backend running at port ${backend_port}`)
})