import { Module } from '@nestjs/common';

@Module({
    imports:[],
    controllers: [TradingController],
    providers : [TradingService]
})

export class TradingModule {}