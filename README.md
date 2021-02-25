# TechShop

TechShop is an online shop for selling technology products. You can buy various types of products on techshop.

You can visit the production app at [ecom-techshop.herokuapp.com](https://ecom-techshop.herokuapp.com/)

## Built WIth

- [TypeScript](https://www.typescriptlang.org/)
  - TypeScript extends JavaScript by adding types.
  - By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.
  - Any browser, any OS, anywhere JavaScript runs. Entirely Open Source.
- [Nodejs](https://nodejs.org/)
  - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Reactjs](https://reactjs.org/)
  - A JavaScript library for building user interfaces
- [PostgreSQL](https://www.postgresql.org/)
  - PostgreSQL: The World's Most Advanced Open Source Relational Database
- [Redis](https://redis.io/)
  - Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.
- [Express](https://expressjs.com/)
  - Fast, unopinionated, minimalist web framework for Node.js
- [Redux](https://redux.js.org/)
  - A Predictable State Container for JS Apps
- [Chakra UI](https://chakra-ui.com/)
  - Build accessible React apps with speed
- [Stripe](https://stripe.com/)
  - Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.

## Initial Setup

### Installation

You will need `node@14.x` and `npm@7.x` installed globally on your machine

```bash
$ git clone
# clone this repository
$ cd ecommerce_shop
# move inside cloned repository
$ npm run client:install
# installs all client modules
$ npm install
# instal all server modules
```

### Environment Setup

Add `.env` file with your own keys

```bash
$ mv .env.sample .env
# rename .env.sample to .env
```

Add your own key

```txt
PG_HOST=<YOUR_KEY>
PG_DATABASE=<YOUR_KEY>
PG_USER=<YOUR_KEY>
PG_PASSWORD=<YOUR_KEY>
PG_PORT=<YOUR_KEY>

SESSION_NAME=<YOUR_KEY>
SESSION_AGE=604800000
SESSION_SECRET=<YOUR_KEY>

REDIS_HOST=<YOUR_KY>
REDIS_PORT=<YOUR_KEY>
REDIS_PASSWORD=<YOUR_KEY>

STRIPE_SECRET_KEY=<YOUR_KEY>
```

Also change `.env` on client folder

```bash
$ cd client && mv .env.sample .env
# rename .env.sample to .env on client folder
```

Add your own key on client

```txt
REACT_APP_STRIPE_KEY=<YOUR KEY>
```

### Start Development Server

```bash
$ npm run dev
# starts both client & server on concurrent mode
```

Once you've started the development server, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
