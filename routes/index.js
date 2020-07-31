const express = require("express");
const router = express.Router();

const Restaurant = require("../controller/restaurant");
const User = require("../controller/user");

router.post("/setup/user", User.setupDummyUser);

router.post("/setup/restaurant", Restaurant.setupDummyRestaurants);

router.post("/user", User.createUser);

router.get("/user/:id", User.getUser);

router.post("/restaurant/search", Restaurant.searchRestaurant);

router.get("/user/:userId/favourite-restaurant", User.getFavouriteRestaurant);

router.post("/user/:userId/favourite-restaurant/:id", User.addFavouriteRestaurant);

router.delete("/user/:userId/favourite-restaurant/:id", User.removeFavouriteRestaurant);

router.get("/user/:userId/blacklist-restaurant", User.getBlacklistRestaurant);

router.post("/user/:userId/blacklist-restaurant/:id", User.addBlackRestaurant);

router.delete("/user/:userId/blacklist-restaurant/:id", User.removeBlacklistRestaurant);

module.exports = router;
