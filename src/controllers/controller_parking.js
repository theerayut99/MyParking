'use strict';

const ParkingService = require('../services/parking');

const Parking = {
  parkingGet: async (req, res, next) => {
    console.log('# Controller Parking.ParkingGet');
    try {
      let resData = {
        code: 1,
        msg: 'Not Found',
        data: {}
      }
      const parkingName = req.query.parking_name;
      const result = await modelRedis.getStoreByKey(parkingName);
      if (result) {
        resData.code = 0;
        resData.msg = 'success';
        resData.data = result;
      }
      return res.json(resData);
    } catch (err) {
      console.error('# Error Controller Parking.ParkingGet:', err);
      return next(err);
    }
  },
  parkingPost: async (req, res, next) => {
    console.log('# Controller Parking.ParkingPost');
    try {
      let resData = {
        code: 1,
        msg: null,
        data: {}
      }
      const parkingName = req.body.parkingName;
      const slot = req.body.parkingSlot;
      const parkingSlot = new ParkingService();
      const parkings = await parkingSlot.createParking(slot);
      const result = await modelRedis.setStoreByKey(parkingName, parkings);
      if (result) {
        resData.code = 0;
        resData.msg = 'success';
        resData.data = parkings.length;
      }
      return res.json(resData);
    } catch (err) {
      console.error('# Error Controller Parking.ParkingPost:', err);
      return next(err);
    }
  }
};

module.exports = Parking;
