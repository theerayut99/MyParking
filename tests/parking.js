const assert = require('chai').assert;

const Parking = require('../src/services/parking');
const parkingSlot = new Parking();
let totalParkings;

describe('Testing Parking Functions', function () {
  it('Creating Parking', (done) => {
    totalParkings = parkingSlot.createParking(5);
    const countParking = totalParkings.length || 0;
    assert.equal(countParking, 5);
    done();
  });

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.addVehicle({
      vehicleNumber: 'กค8882',
      vehicleSize: 'large'
    });
    assert.equal(result, 1, 'Grate!');
    done();
  })

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.addVehicle({
      vehicleNumber: 'จจ9999',
      vehicleSize: 'small'
    });
    assert.equal(result, 2, 'Grate!');
    done();
  })

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.addVehicle({
      vehicleNumber: 'ดด1234',
      vehicleSize: 'midium'
    });
    assert.equal(result, 3, 'Grate!');
    done();
  })

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.addVehicle({
      vehicleNumber: 'พร1',
      vehicleSize: 'large'
    });
    assert.equal(result, 4, 'Grate!');
    done();
  })

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.addVehicle({
      vehicleNumber: 'กด432',
      vehicleSize: 'midium'
    });
    assert.equal(result, 5, 'Grate!');
    done();
  })

  it('Add Vehicle to Parking', (done) => {
    const result = parkingSlot.parkingSlots;
    console.log('slot : ', result)
    done();
  })
});
