'use strict'

exports.requireClientSignature = (req, res, next) => {
	console.log('## Middleware requireClientSignature')
	let resData = {
		code: 1,
		msg: null,
		data: {},
	}
	if (req.headers['x-client-signature']) {
		if (req.headers['x-client-signature'] === global.config.secret) {
			return next()
		} else {
			resData.msg = 'Access Denied'
			return res.status(401).json(resData)
		}
	} else {
		resData.msg = 'Access Denied'
		return res.status(401).json(resData)
	}
}
