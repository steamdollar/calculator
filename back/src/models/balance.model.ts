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
  import { Coin } from './coin.model';
  
  @Table({ tableName: 'balance', timestamps: false })
  export class Balance extends Model {
    @ForeignKey(() => Wallet)
    @Column(DataType.STRING(42))
    wallet: string;
  
    @PrimaryKey
    @Column(DataType.STRING(16))
    coin: string;
  
    @Column(DataType.FLOAT)
    amount: number;
  
    @BelongsTo(() => Wallet, { foreignKey: 'wallet', as: 'walletBalance' })
    walletBalance: Wallet;
  
    @HasMany(() => Coin, { foreignKey: 'name', as: 'coinName' })
    coinName: Coin[];
  }