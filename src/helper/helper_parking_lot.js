const _ = require('lodash')

const helperCountry = {
  _map_vehicleNumber_by_size: function (data) {
    let obj = {}
    if (data) {
      if (data.hasOwnProperty('slotNumber')) obj.slotNumber = data.slotNumber
      if (data.hasOwnProperty('vehicleNumber')) obj.vehicleNumber = data.vehicleNumber
    }
    return obj;
  },
  _map_vehicleNumber_by_size_list: function (list) {
    let arrList = []
		_.forEach(list, function (data) {
			arrList.push(helperCountry._map_vehicleNumber_by_size(data))
		})
		return _.orderBy(arrList, ['slotNumber'], ['asc'])
  }
}

module.exports = helperCountry
