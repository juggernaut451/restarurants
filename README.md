# Restaurant Service

## Setup

Install nodejs (version 12 - LTS)

> https://nodejs.org/en/download/package-manager/

Install mongodb(community edition)
https://docs.mongodb.com/manual/administration/install-community/

Let's start mongo

> sudo service mongod start

mongo shell

> mongo

> use fueled

> db.restaurants.createIndex({ location: "2dsphere"})

> exit

#### Start Project

> npm i

> npm run dev

#### Setup dummy user

> POST http://localhost:3000/api/setup/user

#### Setup dummy restaurants

> POST http://localhost:3000/api/setup/restaurant

### Postman Collection

##### Open postman. Then import restaurants.postman_collection.json


## User details (Dummy)

#### Ram -> 5f201e502a12332902e1b8b7

#### Shyam -> 5f201e502a12332902e1b8b8

#### Sita -> 5f201e502a12332902e1b8b9
