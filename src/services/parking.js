'use strict';

const _ = require('lodash');
const { slowlog } = require('../../config/db_redis');
const modelRedis = require('../models/model_redis')

class Parking {
	constructor () {
    this.slot = 0;
    this.parkingSlots = [];
  }

  setParkingSlot (parkingSlots) {
    this.parkingSlots = parkingSlots;
    this.slot = this.parkingSlots.lenght;
    console.log('setParkingSlot', this.slot, this.parkingSlots)
    return this.parkingSlots;
  }

	createParking (slot) {
    this.slot = _.sumBy(slot, 'slot');
		if (this.slot <= 0) throw new Error('Minimum 1 slot is required');
    let slotIndex = 0;
    slot.map(s => {
      for (var i = 0; i < s.slot; i++) {
        slotIndex += 1
        this.parkingSlots.push({
          slotNumber: slotIndex,
          vehicleNumber: '',
          vehicleSize: s.size
        });
      }
    })
		return this.parkingSlots;
	}

  addVehicle (vehicle) {
    if (this.slot > 0) {
      let slotNumber = this.getNearestSlot(this.parkingSlots, vehicle.vehicleSize);
      if (slotNumber && slotNumber > 0) {
        this.parkingSlots = this.parkingSlots.map(p => {
          if (p.slotNumber === slotNumber) {
            p.vehicleNumber = vehicle.vehicleNumber;
            p.vehicleSize = vehicle.vehicleSize;
          }
          return p;
        })
        return slotNumber;
      } else {
        throw new Error('Sorry, parking slot is full');
      }
    } else {
      return false;
    }
  }

  leaveVehicle (vehicleNumber) {
    let leaveVehicleNumber;
    let isInParkinglot = this.isInParkinglot(vehicleNumber, this.parkingSlots);
    if (!isInParkinglot) return false;
    this.parkingSlots = this.parkingSlots.map(p => {
      if (p.vehicleNumber === vehicleNumber) {
        leaveVehicleNumber = p.vehicleNumber;
        p.vehicleNumber = '';
      }
      return p;
    });
    return leaveVehicleNumber;
  }

  parkingStatus (vehicleNumber) {
    let vehicleByNumber;
    this.parkingSlots.filter(p => {
      if (p.vehicleNumber === vehicleNumber) vehicleByNumber = p.vehicleNumber;
    })
    return vehicleByNumber;
  }

  isInParkinglot (vehicleNumber, parkingSlots) {
    let vehicleByNumber;
    parkingSlots.filter(p => {
      if (p.vehicleNumber === vehicleNumber) vehicleByNumber = p;
    })
    return vehicleByNumber;
  }

  async carBySizeGet (size, parkingSlots) {
    return new Promise(function(resolve, reject) {
      try {
        const carNumber = parkingSlots.filter(p => p.vehicleSize === size && p.vehicleNumber !== '' )
				resolve(carNumber)
			} catch (error) {
				console.error('### Error service Parking.isInSlot', error)
				resolve(false)
			}
		})
  }

  getNearestSlot (parkingSlots, size) {
		for (var i = 0; i < parkingSlots.length; i++) {
			if (parkingSlots[i].vehicleNumber === '' && parkingSlots[i].vehicleSize === size) return parkingSlots[i].slotNumber;
		}
    return false;
  }
}

module.exports = Parking;
