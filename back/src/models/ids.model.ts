import {
        Table,
        Column,
        Model,
        DataType,
        PrimaryKey,
} from "sequelize-typescript";

@Table({ tableName: "ids", timestamps: false })
export class Ids extends Model<Ids> {
        @Column(DataType.STRING(16))
        party: string;

        @PrimaryKey
        @Column(DataType.STRING(22))
        ids: string;
}
