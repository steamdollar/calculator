import { DataTypes, Model, Sequelize } from 'sequelize';
import { Project } from './project';
import { Wallet } from './wallet';
export class AirDrop extends Model {
    public wallet!: string;
    public project!: string;
}

// 하나의 project에 참려하는 지갑이 여러 개 있을 수 있으므로
// proejct1 - 지갑a, project1 -지갑b 식으로 정규화하는게 나을듯
export function initializeAirDrop( sequelize : Sequelize) {
    AirDrop.init({
        wallet: {
            type: DataTypes.CHAR(42),
            references: {
                model: Wallet,
                key: 'addr',
            },
        },
        project: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
    }, {
        tableName: 'airdrop',
        sequelize,
        timestamps : false
    });
}

export function walletAssociatedAirdrop() {
    AirDrop.belongsTo(Wallet, {
        foreignKey : "wallet",
        as : "walletAddr"
    })
}

export function associateProject() {
    AirDrop.hasMany(Project, {
        foreignKey: "name",
        as : "projectName"
    })
}