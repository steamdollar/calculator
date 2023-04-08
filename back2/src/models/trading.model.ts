import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Wallet } from './wallet.model';
  
  @Table({ tableName: 'trading', timestamps: false })
  export class Trading extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    idx: number;
  
    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;
  
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    position: boolean;
  
    @ForeignKey(() => Wallet)
    @Column(DataType.STRING(42))
    wallet: string;
  
    @Column({ type: DataType.FLOAT, allowNull: false })
    tolerance: number;
  
    @Column({ type: DataType.FLOAT, allowNull: false })
    entry: number;
  
    @Column({ type: DataType.FLOAT, allowNull: false })
    sl: number;
  
    @Column({ type: DataType.FLOAT, allowNull: false })
    tp: number;
  
    @Column({ type: DataType.STRING(32), allowNull: false })
    ticker: string;
  
    @Column(DataType.BOOLEAN)
    result: boolean;
  
    @Column(DataType.TEXT)
    memo: string;
  
    @BelongsTo(() => Wallet, { foreignKey: 'wallet', as: 'walletaddr' })
    walletAddr: Wallet;
  }