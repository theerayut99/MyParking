"use strict";

console.info("config:", process.env.NODE_ENV);

let config = {
  domain: "localhost",
  host: "http://localhost:3000",
  port: 3000,
  secret: "K391bnRlci1zPLS2aVBlLQAyb250MN6y",
  redisName: "parking-api",
  redisTimeout: 300,
  redisDealTimeout: 15,
  redis: {
    host: "redis",
    port: 6379,
    token: "parking",
    session: "pk",
    ttl: 60 * 60 * 24 * 7, // 7 days
    db: 1,
  }
}

if (process.env.NODE_ENV === "development") config.redis.host = "localhost"

global.config = config;

module.exports = config;
