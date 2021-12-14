## Table of contents
* [OverView](#overview)
* [Routes](#routes)
* [Setup](#setup)

## Overview
This is a REST API made using NodeJS.

BackGround :

Every day prices of agricultural commodities change across different mandis/markets in the
country. On Gramoday App, daily prices are reported by users whose occupation is mandi
commission agent. Each mandi commission agent maps to one market commodity combination
for which he creates a daily price report.

Prices can be reported across multiple units like Kg, Quintal, Bag, etc. with each unit having a
conversion factor in terms of base unit (kg).

One market commodity combination can have a daily price report contributed by more than 1
user, in which case, an aggregate (average of values) report needs to be created which is
available for consumption on the platform

## Routes
```
POST /api/reports

body : {
"userID": "user-2",
"marketID": "market-1",
"marketName": "Vashi Navi Mumbai",
"cmdtyID": "cmdty-1",
"cmdtyName": "Potato",
"priceUnit": "Quintal",
"convFctr": 100,
"minPrice": 1600,
"maxPrice": 1800,
}
```

```
GET /api/reports?cmdtyId=id
```

## Setup
To run this project locally

```
$ npm install
$ npm run server
```
this will start the api and you can make the POST and GET request from postman or any other service.

## Dependencies
* express
* express-async-handler (for error handling)
* nodemon

Note : incase you dont have nodemon installed in your pc than just start the server with node server.js
