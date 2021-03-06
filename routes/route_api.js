'use strict';

const { Router } = require('express');
const router = Router();

const middleware = require('../middleware/utilities');
const Parking = require('../src/controllers/controller_parking');

router.get('/parking', Parking.parkingGet);
router.post('/parking', Parking.parkingPost);
router.post('/parking/car', Parking.parkingCarPost);
router.get('/parking/car/status', Parking.carStatusGet);
router.get('/parking/car/bysize/:size', Parking.carBySizeGet);
router.get('/parking/slot/bysize/:size', Parking.slotBySizeGet);
router.delete('/parking/car/:vehicleNumber', Parking.leaveCarSlotDelete);

module.exports = router;
