const express = require("express")

import tradingRouter from './trading/trading'

const route = express.Router()

route.use('/trading', tradingRouter)

export default route;