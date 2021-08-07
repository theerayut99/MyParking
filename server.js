'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { Router } = require('express')
const router = Router()


require('./config/config')
require('./config/db_redis')

// require('./src/helper')

// routes
app.use('/api', require('./routes/route_api'));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.'
}));

app.listen(global.config.port, () => {
	console.info('Config:', process.env.NODE_ENV)
	console.info('Host:', global.config.host)
	console.info('Listening on:', global.config.port)
})
