import session from 'express-session'
import connectRedis from 'connect-redis'
import { redisClient } from '../configs/redis.config'

import { keys } from '../configs/keys.config'

const RedisStore = connectRedis(session)

export const sessionMiddleware = session({
  name: keys.SESSION_NAME,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: keys.SESSION_SECRET,
  cookie: {
    maxAge: parseInt(keys.SESSION_AGE),
  },
})
