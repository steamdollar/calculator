import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trading } from 'src/models/trading.model';
import { TradingController } from './trading.controller';
import { TradingService } from './trading.service';

@Module({
    imports:[SequelizeModule.forFeature([Trading])],
    controllers: [TradingController],
    providers : [TradingService]
})

export class TradingModule {}