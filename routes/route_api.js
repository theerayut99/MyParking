'use strict';

const { Router } = require('express');
const router = Router();

const middleware = require('../middleware/utilities');
const Parking = require('../src/controllers/controller_parking');

router.get('/', [middleware.requireClientSignature], function (req, res, next) {
  let resData = {
    code: 1,
    msg: "Welcome to parking API.",
    data: []
  }
  try {
    return res.json(resData)
  } catch (err) {
    console.error('# Error', err)
    return next(err)
  }
})

router.get('/parking', Parking.parkingGet);
router.post('/parking', Parking.parkingPost);

module.exports = router;
