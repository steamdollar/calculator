import { DataTypes, Model, Sequelize } from 'sequelize'
import { Balance } from './balance';

export class Coin extends Model {
    public name!: string;
    public listed_market!: string;
}

export function initializeCoin(sequelize: Sequelize) {
    Coin.init({
        name: {
            type: DataTypes.STRING(16),
            references: {
                model: Balance,
                key: 'coin',
            },
        },
        listed_market: {
            type: DataTypes.STRING(16),
        },
    }, {
        tableName: 'coin',
        sequelize,
        timestamps: false
    });
}

export function balanceAssociatedCoin() {
    Coin.belongsTo(Balance, {
        foreignKey: "name",
        as: "coinName"
    })
}
