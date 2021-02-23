import { config } from "dotenv"
config()

export const keys = {
  // node config
  NODE_ENV: process.env.NODE_ENV!,
  // postgres config
  PG_HOST: process.env.PG_HOST!,
  PG_DATABASE: process.env.PG_DATABASE!,
  PG_USER: process.env.PG_USER!,
  PG_PASSWORD: process.env.PG_PASSWORD!,
  PG_PORT: process.env.PG_PORT!,
  DATABASE_URL: process.env.DATABASE_URL!,
  // session config
  SESSION_NAME: process.env.SESSION_NAME!,
  SESSION_AGE: process.env.SESSION_AGE!,
  SESSION_SECRET: process.env.SESSION_SECRET!,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: process.env.REDIS_PORT!,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
}
