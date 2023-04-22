import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class TxService {
        constructor(protected readonly sequelize: Sequelize) {}

        async withTransaction<T>(
                callback: (transaction: { transaction: any }) => Promise<T>
        ): Promise<T> {
                const transaction = await this.sequelize.transaction();
                const txHost = {
                        transaction: transaction,
                };

                try {
                        const result = await callback(txHost);
                        await transaction.commit();
                        return result;
                } catch (e) {
                        await transaction.rollback();
                        throw e;
                }
        }
}
