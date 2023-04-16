// coin.model.ts
import {
        Table,
        Column,
        Model,
        ForeignKey,
        BelongsTo,
        DataType,
} from "sequelize-typescript";
import { Balance } from "./balance.model";

@Table({ tableName: "coin", timestamps: false })
export class Coin extends Model<Coin> {
        @ForeignKey(() => Balance)
        @Column(DataType.STRING(16))
        token!: Balance;

        @Column(DataType.STRING(10))
        symbol: string;

        @Column(DataType.STRING(16))
        chain: string;

        @Column(DataType.STRING(42))
        ca: string;

        @BelongsTo(() => Balance, { foreignKey: "token", as: "tokenName" })
        tokenName: Balance;
}
