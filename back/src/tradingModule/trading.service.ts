import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trading } from 'src/models/trading.model';
import { makeResponseObj, responseObj } from '../@types/response';
import { receivedDataForSave, SavedData } from './tradingType';

@Injectable()
export class TradingService {
    constructor(@InjectModel(Trading) private tradingModel : typeof Trading) {}

    async saveTradingData(tradingData : receivedDataForSave): Promise<responseObj> {
        let response : responseObj
        const dataSaved = {...tradingData, date : new Date()}
        try {
            await this.tradingModel.create(dataSaved)
            response = makeResponseObj(0, "data successfully saved")
        } catch(e) {
            console.log(e)
            response = makeResponseObj(1, "err : failed to save trading record")
        } finally {
            return response;
        }
    }
}
