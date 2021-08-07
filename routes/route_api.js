'use strict';

const { Router } = require('express');
const router = Router();

const middleware = require('../middleware/utilities');
const Parking = require('../src/controllers/controller_parking');

router.get('/parking', Parking.parkingGet);
router.post('/parking', Parking.parkingPost);
router.post('/parking/car', Parking.parkingCarPost);
router.delete('/parking/car/:parkingName/:vehicleNumber', Parking.leaveCarSlotDelete);
router.get('/parking/status', Parking.carStatusGet);

module.exports = router;
