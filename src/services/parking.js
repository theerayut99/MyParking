'use strict';

const modelRedis = require('../models/model_redis')

class Parking {
	constructor () {
    this.slot = 0;
    this.parkingSlots = [];
  }

	createParking (slot) {
		this.slot = slot;
		if (this.slot <= 0) throw new Error('Minimum 1 slot is required');
    for (var i = 0; i < this.slot; i++) {
      this.parkingSlots.push({
        slotNumber: i+1,
        vehicleNumber: '',
        vehicleSize: ''
      });
    }
		return this.parkingSlots;
	}

  addVehicle (vehicle) {
    if (this.slot > 0) {
      if (this.getNearestSlot(this.parkingSlots) === true) {
        for (var i = 0; i < this.slot; i++) {
          if (this.parkingSlots[i].vehicleNumber === '' && this.parkingSlots[i].vehicleSize === '') {
            this.parkingSlots[i].vehicleNumber = vehicle.vehicleNumber;
            this.parkingSlots[i].vehicleSize = vehicle.vehicleSize;
            return this.parkingSlots[i].slotNumber;
          }
        }
      } else {
        throw new Error('Sorry, parking slot is full');
      }
    } else {
      return false;
    }
  }

  getNearestSlot () {
    let result = false;
		for (var i = 0; i < this.parkingSlots.length; i++) {
			if (this.parkingSlots[i].vehicleNumber === '' && this.parkingSlots[i].vehicleSize === '') result = true;
		}
		return result;
  }
}

module.exports = Parking;
