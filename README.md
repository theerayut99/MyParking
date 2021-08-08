# My Parkinglot

## Problem Statement
I own a parking lot that can hold up to ‘n’ cars at any given point in time. I want to
create an automated ticketing system that allows my customers to use my parking lot
without human intervention.
When a car enters my parking lot, I want to have a ticket issued to the driver. The
ticket information contains the registration number (number plate) and the car size and
allocated parking slot (we assume that our customers are nice enough to always park in the
slots allocated to them). The customer should be allocated a parking slot which is nearest to
the entry. At the exit the customer returns the ticket which then marks the slot they were
using as being available. 

# Quick Start. 

## Installation
```
$ cd MyParking
$ cd docker-compose
$ docker-compose up -d --build
```

## Development
```
$ cd MyParking
$ npm install
$ npm run dev
```

## Unit Test

![Screen Shot 2564-08-08 at 22 26 07](https://user-images.githubusercontent.com/12118419/128637189-b9b57515-31bc-4a3c-a4f4-aa3a99a160d8.png)


## api to create parking lot
### Request
```
curl --request POST \
  --url http://localhost:3000/api/parking \
  --header 'Content-Type: application/json' \
  --header 'x-client-signature: K391bnRlci1zPLS2aVBlLQAyb250MN6y' \
  --data '{
	"parkingLot": [
		{
			"size": "small",
			"slot": 2
		},
		{
			"size": "medium",
			"slot": 2
		},
		{
			"size": "large",
			"slot": 1
		}
	]
}'
```
### Response
```
{
  "code": 0,
  "msg": "success",
  "data": 5
}
```

## api to park the car
### Request
```
curl --request POST \
  --url http://localhost:3000/api/parking/car \
  --header 'Content-Type: application/json' \
  --header 'x-client-signature: K391bnRlci1zPLS2aVBlLQAyb250MN6y' \
  --data '{
	"item": {
		"vehicleNumber": "กด88",
		"vehicleSize": "small"
	}
}'
```
### Response
```
{
  "code": 0,
  "msg": "success",
  "data": 2
}
```

## api to leave the slot 
### Request
```
curl --request DELETE \
  --url http://localhost:3000/api/parking/car/%E0%B8%81%E0%B8%94555 \
  --header 'Content-Type: application/json'
```
### Response
```
{
  "code": 0,
  "msg": "success",
  "data": "กด555"
}
```

## api to get status of parking lot 
### Request
```
curl --request GET \
  --url 'http://localhost:3000/api/parking/car/status?vehicleNumber=%E0%B8%81%E0%B8%9488'
```
### Response
```
{
  "code": 0,
  "msg": "The car is in the parking lot.",
  "data": {
    "slotNumber": 1,
    "vehicleNumber": "กด88",
    "vehicleSize": "small"
  }
}
```

## api to get registration plate number list by car size
### Request
```
curl --request GET \
  --url 'http://localhost:3000/api/parking/car/bysize/small?size=small'
```
### Response
```
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "slotNumber": 1,
      "vehicleNumber": "กด88"
    },
    {
      "slotNumber": 2,
      "vehicleNumber": "พพ9999"
    }
  ]
}
```

## api to get registration allocated slot number list by car size 
### Request
```
curl --request GET \
  --url 'http://localhost:3000/api/parking/slot/bysize/large?size=small'
```
### Response
```
{
  "code": 0,
  "msg": "success",
  "data": {
    "slotNumber": 5
  }
}
```
