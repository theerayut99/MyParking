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
  },
  parkingCarPost: async (req, res, next) => {
    console.log('# Controller Parking.parkingCarPost');
    try {
      let resData = {
        code: 1,
        msg: null,
        data: {}
      }
      let parkingName = req.body.parkingName;
      let vehicle = req.body.item;
      let parkingsSlot = await modelRedis.getStoreByKey(parkingName);
      const parkingSlot = new ParkingService();
      const isInParkinglot = await parkingSlot.isInParkinglot(vehicle.vehicleNumber, parkingsSlot);
      if (isInParkinglot) {
        resData.msg = "The car is in the parking lot.";
        return res.json(resData);
      }
      let slotNumber = parkingSlot.getNearestSlot(parkingsSlot);
      if (slotNumber && slotNumber > 0) {
        parkingsSlot = parkingsSlot.map(p => {
          if (p.slotNumber === slotNumber) {
            p.vehicleNumber = vehicle.vehicleNumber;
            p.vehicleSize = vehicle.vehicleSize;
          }
          return p;
        });
      } else {
        resData.msg = "Parking lot is full.";
        return res.json(resData);
      }
      const result = await modelRedis.setStoreByKey(parkingName, parkingsSlot);
      if (result) {
        resData.code = 0;
        resData.msg = 'success';
        resData.data = slotNumber;
      }
      return res.json(resData);
    } catch (err) {
      console.error('# Error Controller Parking.parkingCarPost:', err);
      return next(err);
    }
  },
  leaveCarSlotDelete: async (req, res, next) => {
    console.log('# Controller Parking.leaveCarSlotDelete');
    try {
      let resData = {
        code: 1,
        msg: null,
        data: {}
      }
      let parkingName = req.params.parkingName;
      let vehicleNumber = req.params.vehicleNumber;
      let parkingsSlot = await modelRedis.getStoreByKey(parkingName);
      const parkingSlot = new ParkingService();
      const isInParkinglot = await parkingSlot.isInParkinglot(vehicleNumber, parkingsSlot);
      if (!isInParkinglot) {
        resData.msg = "The car is not in the parking lot.";
        return res.json(resData);
      }
      parkingsSlot = parkingsSlot.map(p => {
        if (p.vehicleNumber === vehicleNumber) {
          p.vehicleNumber = '';
          p.vehicleSize = '';
        }
        return p;
      });
      const result = await modelRedis.setStoreByKey(parkingName, parkingsSlot);
      if (result) {
        resData.code = 0;
        resData.msg = 'success';
        resData.data = vehicleNumber;
      }
      return res.json(resData);
    } catch (err) {
      console.error('# Error Controller Parking.leaveCarSlotDelete:', err);
      return next(err);
    }
  }
};

module.exports = Parking;
