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
      const result = await modelRedis.getStoreByKey('park');
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
      const slot = req.body.parkingSlot;
      const parkingSlot = new ParkingService();
      const parkings = await parkingSlot.createParking(slot);
      const result = await modelRedis.setStoreByKey('park', parkings);
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
      let vehicle = req.body.item;
      let parkingsSlot = await modelRedis.getStoreByKey('park');
      const parkingSlot = new ParkingService();
      const isInParkinglot = await parkingSlot.isInParkinglot(vehicle.vehicleNumber, parkingsSlot);
      if (isInParkinglot) {
        resData.msg = "The car is in the parking lot.";
        return res.json(resData);
      }
      let slotNumber = parkingSlot.getNearestSlot(parkingsSlot, vehicle.vehicleSize);
      if (slotNumber && slotNumber > 0) {
        parkingsSlot = parkingsSlot.map(p => {
          if (p.slotNumber === slotNumber) {
            p.vehicleNumber = vehicle.vehicleNumber;
            p.vehicleSize = vehicle.vehicleSize;
          }
          return p;
        });
      } else {
        resData.msg = `Parking lot size ${vehicle.vehicleSize} is full.`;
        return res.json(resData);
      }
      const result = await modelRedis.setStoreByKey('park', parkingsSlot);
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
      let vehicleNumber = req.params.vehicleNumber;
      let parkingsSlot = await modelRedis.getStoreByKey('park');
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
      const result = await modelRedis.setStoreByKey('park', parkingsSlot);
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
  },
  carStatusGet: async (req, res, next) => {
    console.log('# Controller Parking.leaveCarSlotDelete');
    try {
      let resData = {
        code: 1,
        msg: null,
        data: {}
      }
      let vehicleNumber = req.query.vehicleNumber;
      let parkingsSlot = await modelRedis.getStoreByKey('park');
      const parkingSlot = new ParkingService();
      const carInParkinglot = parkingSlot.isInParkinglot(vehicleNumber, parkingsSlot);
      if (!carInParkinglot) {
        resData.msg = "The car is not in the parking lot.";
        return res.json(resData);
      } else {
        resData.code = 0;
        resData.msg = "The car is in the parking lot.";
        resData.data = carInParkinglot;
        return res.json(resData);
      }
    } catch (err) {
      console.error('# Error Controller Parking.leaveCarSlotDelete:', err);
      return next(err);
    }
  },
  carBySizeGet: async (req, res, next) => {
    console.log('# Controller Parking.leaveCarSlotDelete');
    try {
      let resData = {
        code: 1,
        msg: null,
        data: {}
      }
      let size = req.params.size;
      let parkingsSlot = await modelRedis.getStoreByKey('park');
      const parkingSlot = new ParkingService();
      const vehicleNumber = await parkingSlot.carBySizeGet(size, parkingsSlot);
      if (!vehicleNumber) {
        resData.msg = `The car size ${size} is not in the parking lot.`;
        return res.json(resData);
      } else {
        resData.code = 0;
        resData.msg = "success";
        resData.data = global.helper.parking_lot._map_vehicleNumber_by_size_list(vehicleNumber);
        return res.json(resData);
      }
    } catch (err) {
      console.error('# Error Controller Parking.leaveCarSlotDelete:', err);
      return next(err);
    }
  },
};

module.exports = Parking;
