import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly logger: Logger,
  ) {}

  onModuleInit() {
    this.redisClient.on('ready', () => {
      this.logger.log('Redis client is ready.');
    });

    this.redisClient.on('error', (error) => {
      this.logger.error(`Redis client error: ${error}`);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }
}
