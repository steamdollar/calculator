import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// db data
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Wallet } from './models/wallet.model';
import { Trading } from './models/trading.model';
import { AirDrop } from './models/airdrop.model';
import { Balance } from './models/balance.model';
import { Project } from './models/project.model';
import { Coin } from './models/coin.model';

@Module({
  imports: [
        ConfigModule.forRoot(),
        // SequelizeModule.forRoot({
        //     dialect : "mysql",
        //     host : process.env.DB_HOST,
        //     port : parseInt(process.env.DB_PORT),
        //     username : process.env.DB_USER,
        //     password : process.env.DB_PASSWORD,
        //     database : process.env.DB_NAME,
        //     models : [Wallet, Trading, AirDrop, Balance, Project, Coin]    
        // })
        SequelizeModule.forRoot({
            dialect : "mysql",
            host : '127.0.0.1',
            port : 3306,
            username : 'sila',
            password : "11",
            database : "calculator",
            models : [Wallet, Trading, AirDrop, Balance, Project, Coin]    
        })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
    constructor ( private sequelize : Sequelize) {}
}