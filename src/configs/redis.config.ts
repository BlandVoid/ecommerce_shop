import Redis from 'ioredis'

export const redisClient = new Redis({ retryStrategy: () => 1000 })
