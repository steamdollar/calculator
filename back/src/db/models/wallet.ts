import { DataTypes, Model, Sequelize } from 'sequelize';
import { AirDrop } from './airdrop';
import { Balance } from './balance';
import { Trading } from './trading';

export class Wallet extends Model {
    public addr!: string;
    public affiliation!: string;
    public purpose!: string;
}

export function initializeWallet( sequelize : Sequelize) {
    Wallet.init(
        {
            addr: {
                type: DataTypes.CHAR(42),
                primaryKey: true,
            },
            affiliation: {
                type: DataTypes.STRING(32),
            },
            purpose: {
                type: DataTypes.STRING(32),
            },
        },
        {
        modelName: 'wallet',
        sequelize,
        timestamps : false,
    });
}

export function associateTrading() {
    Wallet.hasMany(Trading, {
        foreignKey : 'wallet',
        as : "walletTrading"
    })
}

export function associateAirdrop() {
    Wallet.hasMany(AirDrop, {
        foreignKey :'wallet',
        as : "walletAirdrop"
    })
}

export function associateBalance() {
    Wallet.hasMany(Balance, {
        foreignKey : 'wallet',
        as : "walletBalance"
    })
}