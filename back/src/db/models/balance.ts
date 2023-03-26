import { DataTypes, Model, Sequelize } from 'sequelize';
import { Coin } from './coin';
import { Wallet } from './wallet';

export class Balance extends Model {
    public addr!: string;
    public coin!: string;
    public balance!: number;
}

export function initializeBalance (sequelize : Sequelize) {
    Balance.init({
        wallet: {
            type: DataTypes.CHAR(42),
            primaryKey: true,
            references: {
                model: Wallet,
                key: 'addr',
            },
        },
        coin: {
            type: DataTypes.STRING(16),
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
        },
    }, {
        tableName: 'balance',
        sequelize,
        timestamps : false
    });
}

export function walletAssociatedBalance() {
    Balance.belongsTo(Wallet, {
        foreignKey : "wallet",
        as : "walletBalance"
    })
}

export function associateCoin() {
    Balance.hasMany(Coin, {
        foreignKey : "name",
        as : "coinName"
    })
}