import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
import { associateProject, initializeAirDrop, walletAssociatedAirdrop } from "./models/airdrop";
import { associateAirdrop, associateBalance, associateTrading, initializeWallet } from "./models/wallet";
import { initializeTrading, walletAssociatedTrading } from "./models/trading";
import { associateCoin, initializeBalance, walletAssociatedBalance } from "./models/balance";
import { airDropAssociatedProject, initializeProject } from "./models/project";
import { balanceAssociatedCoin, initializeCoin } from "./models/coin";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
})

export const setUpDatabase = (sequelize: Sequelize) => {
    initializeWallet(sequelize)
    initializeTrading(sequelize)
    initializeAirDrop(sequelize)
    initializeBalance(sequelize)
    initializeProject(sequelize)
    initializeCoin(sequelize)

    associateTrading()
    associateBalance()
    associateAirdrop()

    associateProject()
    associateCoin()

    walletAssociatedTrading()
    walletAssociatedAirdrop()
    walletAssociatedBalance()
    airDropAssociatedProject()
    balanceAssociatedCoin()
}