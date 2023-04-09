import {
        Table,
        Column,
        Model,
        PrimaryKey,
        ForeignKey,
        BelongsTo,
        DataType,
} from "sequelize-typescript";
import { AirDrop } from "./airdrop.model";

@Table({ tableName: "project", timestamps: false })
export class Project extends Model {
        @PrimaryKey
        @Column({
                type: DataType.STRING(32),
        })
        name!: string;

        @Column({ type: DataType.STRING(256) })
        link!: string;

        @Column({ type: DataType.STRING(16) })
        status!: string;
        // maybe 3 accounts will enough?
        @Column({ type: DataType.STRING(32) })
        twitter: string;

        @Column({ type: DataType.STRING(32) })
        discord: string;

        @ForeignKey(() => AirDrop)
        @Column
        airDropProjectName!: string;

        @BelongsTo(() => AirDrop, { foreignKey: "airDropProjectName" })
        airDrop!: AirDrop;
}
