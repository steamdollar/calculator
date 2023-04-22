// coin.model.ts
import {
        Table,
        Column,
        Model,
        ForeignKey,
        BelongsTo,
        DataType,
} from "sequelize-typescript";

@Table({ tableName: "coin", timestamps: false })
export class Coin extends Model<Coin> {
        @Column(DataType.STRING(16))
        token!: string;

        @Column(DataType.STRING(10))
        symbol: string;

        @Column(DataType.STRING(16))
        chain: string;

        @Column(DataType.STRING(42))
        ca: string;
}
