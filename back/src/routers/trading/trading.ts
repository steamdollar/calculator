import express, { Request, Response } from 'express'
import { makeResponse } from '../../utils/response'
import { response } from '../../@types/response'
import { Trading } from '../../db/models/trading'

const router = express.Router()

router.post('/saveTradingData', async (req: Request, res: Response) => {
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

export default router;