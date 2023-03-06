import express from 'express'
const app = express()

require('dotenv').config()

const backend_port = process.env.BACKEND_PORT

app.get('/', (req, res)=> {
    res.send('hello calculator')
})

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`calculator backend running at port ${backend_port}`)
})