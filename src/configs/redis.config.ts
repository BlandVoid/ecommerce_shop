import Redis from "ioredis"
import _ from "lodash"

import { keys } from "./keys.config"

export const redisClient = new Redis({
  host: keys.REDIS_HOST,
  port: _.parseInt(keys.REDIS_PORT),
  password: keys.REDIS_PASSWORD,
  retryStrategy: () => 10000,
})

redisClient.on("connect", () => console.log("redis connected"))

redisClient.on("error", (err) => console.log(err.message))
