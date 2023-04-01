import { DataTypes, Model, Sequelize } from 'sequelize';
import { Wallet } from './wallet';

export class Trading extends Model {
    public idx!: number;
    public date!: Date;
    public wallet!: string;
    public tolerance!: number;
    public entry!: number;
    public sl!: number;
    public tp!: number;
    public ticker!: string;
    public result!: boolean;
    public memo!: string;
}

export function initializeTrading(sequelize : Sequelize) {
    Trading.init({
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
        },
        wallet: {
            type: DataTypes.CHAR(42),
            references: {
                model: Wallet,
                key: 'addr',
            },
        },
        tolerance: DataTypes.FLOAT,
        entry: DataTypes.FLOAT,
        sl: DataTypes.FLOAT,
        tp: DataTypes.FLOAT,
        ticker: DataTypes.STRING(32),
        result: DataTypes.BOOLEAN,
        memo: DataTypes.TEXT,
    }, {
        tableName: 'trading',
        timestamps : false,
        sequelize,
    });
}

export function walletAssociatedTrading() {
    Trading.belongsTo(Wallet, {
        foreignKey : "wallet",
        as : "walletaddr"
    })
}