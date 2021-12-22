#Weather App API

Api(proxy) for weather app (data is fetching from [https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)) with authorization based on JWT, built with Node.js, Express, MongoDB.


###Description

- All weather data is received from [https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)

- Endpoints:
    *  GET  /authorization -  checks if you have access to the given resource
    *  POST /login - request to get access to the given resource
    *  GET  /logout-  request to remove auth cookies
    *  GET  /weather - request with query parameter "cityName" (string) for current weather in requested city

##Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine. (tested on Node v.14.18.1)

###Installation:

`npm ci`

###To Start Server:

`npm run start`

###To start dev server (with nodemon)

`npm run dev`

Both scripts start server on [https://localhost:4000](https://localhost:4000)


To login use next creds:
- Username: User
- Password: 6LW2Tg9zZ5