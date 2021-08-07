'use strict'

const Promise = require('bluebird')
const _ = require('lodash')
const dbRedis = require('../../config/db_redis')

const modelRedis = {
	setStoreByKey: function(key = 'prefix', obj = {}) {
		// console.log('### model Redis.setStoreByKey')
		const redisKey = key;
		return new Promise(function(resolve, reject) {
      try {
			  const timeout = 60 * 60 * 24 * 30
				const strObj = JSON.stringify(obj)
				dbRedis.setex(redisKey, timeout, strObj)
				resolve(true)
			} catch (error) {
				console.error('### Error model Redis.setStoreByKey', error)
				resolve(false)
			}
		})
	},
	getStoreByKey: function(key) {
		// console.log('### model Redis.getStoreByKey');
		const redisKey = key;
		return new Promise(function(resolve, reject) {
      try {
				const redisKey = key;
				dbRedis.get(redisKey, async function(err, _data) {
          if (_data) {
            let objData = JSON.parse(_data)
            resolve(objData)
          } else {
            return resolve(false)
          }
        })
			} catch (error) {
				console.error('### Error model Redis.getStoreByKey', error)
				resolve(false)
			}
		})
	},
	deleteStoreByKey: function(key) {
    return new Promise(function(resolve, reject) {
			try {
				const redisKey = key + '*'
				dbRedis.keys(redisKey, function(err, _data) {
					if (_data) {
						_.forEach(_data, function(rowData, index) {
							dbRedis.del(rowData)
						})
						resolve(true)
					} else {
						resolve(true)
					}
				})
			} catch (error) {
				console.error('### Error model Redis.deleteStoreByKey', error)
				resolve(false)
			}
		})
	}
}
global.modelRedis = modelRedis
module.exports = modelRedis
