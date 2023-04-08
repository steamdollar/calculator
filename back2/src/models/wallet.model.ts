import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Trading } from './trading.model';
import { AirDrop } from './airdrop.model';
import { Balance } from './balance.model';

@Table({ tableName: 'wallet', timestamps: false })
export class Wallet extends Model {
  @Column({
    type: DataType.CHAR(42),
    primaryKey: true,
  })
  addr: string;

  @Column(DataType.STRING(32))
  affiliation: string;

  @Column(DataType.STRING(32))
  purpose: string;

  @HasMany(() => Trading, { foreignKey: 'wallet', as: 'walletTrading' })
  tradings: Trading[];

  @HasMany(() => AirDrop, { foreignKey: 'wallet', as: 'walletAirdrop' })
  airdrops: AirDrop[];

  @HasMany(() => Balance, { foreignKey: 'wallet', as: 'walletBalance' })
  balances: Balance[];
}