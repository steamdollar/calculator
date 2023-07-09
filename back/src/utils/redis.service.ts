import { Redis } from "ioredis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisService {
        private redisClient: Redis;

        constructor() {
                this.redisClient = new Redis({
                        host: "localhost",
                        port: 6379,
                });
        }

        // redis store에 k-v 페어 저장
        async set(key: string, value: any): Promise<void> {
                await this.redisClient.set(key, JSON.stringify(value));
        }

        // 저장되어 있는 데이터를 key를 이용해 회수
        async get(key: string): Promise<any> {
                const data = await this.redisClient.get(key);
                if (data) {
                        return JSON.parse(data);
                }
                return null;
        }

        // 저장중인 데이터를 key로 삭제
        async del(key: string): Promise<void> {
                await this.redisClient.del(key);
        }
}
