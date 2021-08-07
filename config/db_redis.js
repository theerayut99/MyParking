const redis = require('redis')
const config = require('./config')

redis.RedisClient.prototype.delWildcard = function (key, callback) {
	const redis = this

	redis.keys(key, function (err, rows) {
		for (const i = 0, j = rows.length; i < j; ++i) {
			redis.del(rows[i])
		}
		return callback()
	})
}

console.info('redis: {host: %s, port: %s, database: %s}', config.redis.host, config.redis.port, config.redis.db)

const dbRedis = redis.createClient({
	host: global.config.redis.host,
	port: global.config.redis.port,
	db: global.config.redis.db,
	prefix: global.config.redis.token + ':',
	ttl: global.config.redis.ttl,
	password: global.config.redis.auth,
})

dbRedis.on('error', function (err) {
	console.error('redis ' + err)
})
dbRedis.select(config.redis.db, function () {
	console.info('RedisSelectDB ::', config.redis.db)
})

module.exports = dbRedis
