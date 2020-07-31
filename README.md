# Restaurant Service

## Setup

Install nodejs (version 12 - LTS)
https://nodejs.org/en/download/package-manager/

Install mongodb(community edition)
https://docs.mongodb.com/manual/administration/install-community/

Let's start mongo
sudo service mongod start

// mongo shell
mongo

use fueled

db.restaurants.createIndex({ location: "2dsphere"})

exit

//Project start
// go into the project folder
npm i
npm run dev


## User details (Dummy)

#### Ram -> 5f201e502a12332902e1b8b7

#### Shyam -> 5f201e502a12332902e1b8b8

#### Sita -> 5f201e502a12332902e1b8b9
