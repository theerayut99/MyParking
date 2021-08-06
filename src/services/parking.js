'use strict';

class Parking {
	constructor () {
    this.slot = 0;
    this.parkingSlots = [];
  }

	createParking (slot) {
		this.slot = slot;
		if (this.slot <= 0) throw new Error('Minimum 1 slot is required');
    // TODO Insert slot to parks
    for (var i = 0; i < this.slot; i++) {
      this.parkingSlots.push(null);
    }
		return this.slot;
	}

  addVehicle (vehicle) {
    // TODO Update park slot
    if (this.slot > 0) {
      if (this.getNearestSlot(this.parkingSlots) === true) {
        for (var i = 0; i < this.slot; i++) {
          if (this.parkingSlots[i] == null) {
            this.parkingSlots[i] = vehicle;
            return i + 1;
          }
        }
      } else {
        throw new Error('Sorry, parking slot is full');
      }
    }
    return car;
  }

  getNearestSlot () {
    let result = false;
    console.log('### Check Slot :', this.parkingSlots)
		for (var i = 0; i < this.parkingSlots.length; i++) {
			if (this.parkingSlots[i] == null) result = true;
		}
		return result;
  }
}

module.exports = Parking;
