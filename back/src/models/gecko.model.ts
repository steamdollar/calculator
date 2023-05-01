import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "gecko", timestamps: false })
export class Gecko extends Model<Gecko> {
        @Column(DataType.STRING(30))
        geckoChainId: string;

        @Column(DataType.STRING(16))
        chain: string;
}
