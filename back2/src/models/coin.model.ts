// coin.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Balance } from './balance.model';

@Table({ tableName: 'coin', timestamps: false })
export class Coin extends Model<Coin> {
  @Column({ primaryKey: true })
  name!: string;

  @Column
  listed_market!: string;

  @ForeignKey(() => Balance)
  @Column
  balanceCoinName!: string;

  @BelongsTo(() => Balance, { foreignKey: 'balanceCoinName', as: 'coinName' })
  balance!: Balance;
}
