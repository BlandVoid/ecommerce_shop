import { Pool } from "pg"

import { keys } from "./keys.config"

export const pool = new Pool({
  host: keys.PG_HOST,
  database: keys.PG_DATABASE,
  user: keys.PG_USER,
  password: keys.PG_PASSWORD,
  port: parseInt(keys.PG_PORT),
})

//show error on pg error
pool.on("error", (err) => console.log(err.message))

//initial db setup
;(async () => {
  try {
    //query db and create extension
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    //create user table
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      user_id UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
      email VARCHAR(256) NOT NULL UNIQUE,
      username VARCHAR(256) NOT NULL UNIQUE,
      first_name VARCHAR(256),
      last_name VARCHAR(256),
      password VARCHAR(256) NOT NULL
    );`)
    // create orders table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS orders(
        order_id UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
        author_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        address VARCHAR(256) NOT NULL,
        city VARCHAR(256) NOT NULL,
        country VARCHAR(256) NOT NULL,
        zip VARCHAR(256) NOT NULL,
        order_amount NUMERIC(10,2) NOT NULL,
        paid BOOLEAN NOT NULL DEFAULT FALSE,
        order_products VARCHAR(1024) NOT NULL 
      );
    `)
    //
  } catch (error) {
    console.log(error.message)
  }
})()
