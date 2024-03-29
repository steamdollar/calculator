import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Trading } from "./trading.model";

@Table({ tableName: "wallet", timestamps: false })
export class Wallet extends Model {
        @Column({
                type: DataType.STRING(42),
                primaryKey: true,
        })
        address: string;

        @Column(DataType.STRING(32))
        name: string;

        @HasMany(() => Trading, { foreignKey: "wallet", as: "walletTrading" })
        tradings: Trading[];
}
