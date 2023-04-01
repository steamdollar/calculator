import { DataTypes, Model, Sequelize } from 'sequelize'
import { Balance } from './balance';

export class Coin extends Model {
    public name!: string;
    public listed_market!: string;
}

export function initializeCoin( sequelize : Sequelize) {
    Coin.init({
        name: {
            type: DataTypes.STRING(16),
        },
        listed_market: {
            type: DataTypes.STRING(16),
        },
    }, {
        tableName: 'coin',
        sequelize,
        timestamps : false
    });
}

export function balanceAssociatedCoin() {
    Coin.belongsTo( Balance, {
        foreignKey : "coin",
        as : "coinName"
    })
}
