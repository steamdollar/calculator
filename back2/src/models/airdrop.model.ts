import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    PrimaryKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';

import { Wallet } from './wallet.model';
import { Project } from './project.model';
  
@Table({ tableName: 'airdrop', timestamps: false })
export class AirDrop extends Model {
    @ForeignKey(() => Wallet)
    @Column(DataType.STRING(42))
    wallet: string;
  
    @PrimaryKey
    @Column(DataType.STRING(50))
    project: string;
  
    @BelongsTo(() => Wallet, { foreignKey: 'wallet', as: 'walletAddr' })
    walletAddr: Wallet;
  
    @HasMany(() => Project, { foreignKey: 'name', as: 'projectName' })
    projectName: Project[];
}  