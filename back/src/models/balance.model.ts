import {
        Table,
        Column,
        Model,
        DataType,
        ForeignKey,
        BelongsTo,
        HasMany,
        PrimaryKey,
} from "sequelize-typescript";
import { Wallet } from "./wallet.model";
import { Coin } from "./coin.model";

// @Table({ tableName: "balance", timestamps: false })
// export class Balance extends Model {
//         @PrimaryKey
//         @Column(DataType.STRING(20))
//         id: string;

//         @Column(DataType.STRING(42))
//         wallet: string;

//         @ForeignKey(() => Coin)
//         @Column(DataType.STRING(20))
//         token: string;

//         @BelongsTo(() => Wallet, { foreignKey: "wallet", as: "walletBalance" })
//         walletBalance: Wallet;
// }
