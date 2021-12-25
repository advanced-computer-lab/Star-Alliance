

# Star-Alliance
The Project aim was to create fully functional Airline Reservation System where individuals can reserve and pay for flights in order to travel to different countries and sometimes domestic cities.

## Motivation
The purpose of the website to ease the process of reserving flights and other optional services(renting a car-booking a room-etc.).

## Framework used
MERN Stack was used to build the website

## Features
**User**
- Round-Trip Flight Reservation.
- Reservation Cancellation.
- Payment & Refunding for Reservations.
- Editing each Flight in Reservation.
- Automatic Mailing for the above features.
- User can choose seat(s) after viewing airplane grid.
- Login, Logout, Change Password 
- Opportunity to have other services(renting a car, booking a taxi, reserving a room, buying from duty free, discover activities).

**Admin**
- Creating Flights.
- Deleting Flights.
- Updating Flights.
- Vieweing Flights.
- Login, Logout, Change Password 


**Guest**
- Search Flights.
- SignUp

## Installation
  1. `git clone https://github.com/advanced-computer-lab/Star-Alliance.git`
  2. `cd Star-Alliance`
  3. `npm i && cd client && npm i && cd ..`
  3. `npm run dev`

### .ENV file

key|value
---|---
DB_URI|Mongodb connection string, for example `mongodb+srv://??:??@??db.k4yey.mongodb.net/myDatabase?retryWrites=true&w=majority`
React_Server_Origin|Developement localhost for accessing react default `localhost:3000`
email|Gmail account, used to Send the emails `???@gmail.com`
pass|the Gamil's account password
REFRESH_TOKEN_SECRET|Random refresh token secret
ACCESS_TOKEN_SECRET|Random refresh token secret
STRIPE_PRIVATE_KEY| Stripe's prive api key ex `sk_test_????`

## API reference
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Stripe](https://www.npmjs.com/package/stripe)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Libraries Used 
- [Material UI](https://mui.com/getting-started/usage/)
- [Bootstrap](https://react-bootstrap.github.io/)


## Credits
- [Fly Emirates](https://www.emirates.com/eg/english/)
- [Swiss Airlines](https://www.swiss.com/eg/en/homepage)
- [Qatar Airways](https://www.qatarairways.com/en-eg/homepage.html)
- [Lufthansa](https://www.lufthansa.com/eg/en/homepage)
- [Singapore Airlines](https://www.singaporeair.com/en_UK/sg/home#/book/bookflight)

## Contributors
-[Abdelrahman Hafez](https://github.com/AbdalrahmanHafez)
-[Mostafa Mohamed](https://github.com/mostafa301)
-[Mohammed Yehia](https://github.com/MohamedEl-Husseiny)
-[Youssef Alaa Thabet](https://github.com/youssefAlaaThabet)
-[Yousef Magdy](https://github.com/yousefmagdy)
