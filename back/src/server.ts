import express  from 'express'
import { sequelize, setUpDatabase } from './db/index'
import cors from 'cors'
import router from './routers'

require('dotenv').config()

const app = express()

// db sync
setUpDatabase(sequelize)

// received data parsing optionss
app.use(cors({ origin: process.env.FRONTEND_ADDRESS, credentials: true }))
app.use(express.json())

app.use('/', router)

app.listen(process.env.BACKEND_PORT, async () => {
    try {
        await sequelize.sync({ force: true })
    } catch (e) {
        console.log(e)
    }
    console.log(`calculator backend running at port :`, process.env.BACKEND_PORT)
})