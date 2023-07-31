import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { ethers } from "ethers";
import { Coin } from "../../models/coin.model";

@Injectable()
export class Web3Service {
        private provider: ethers.JsonRpcProvider;

        constructor(@InjectModel(Coin) private coinModel: typeof Coin) {}
}
