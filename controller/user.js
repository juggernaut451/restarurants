const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const mongoose = require("mongoose");
const _ = require("underscore");
const { use } = require("../routes");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    setupDummyUser: async (req, res) => {
        try {
            const users = [
                { name: "Ram", userId: "5f201e502a12332902e1b8b7" },
                { name: "Shyaam", userId: "5f201e502a12332902e1b8b8" },
                { name: "Sita", userId: "5f201e502a12332902e1b8b9" },
            ];
            for (let user of users) {
                let tempUser = new User({
                    name: user.name,
                    _id: mongoose.Types.ObjectId(user.userId),
                });
                await tempUser.save();
            }
            return res.status(201).send("User created successfully");
        } catch (error) {
            console.log("error at setupDummyUser : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    createUser: async (req, res) => {
        try {
            let name = req.body.name || undefined;
            if (name) {
                let newUser = new User({ name });
                await newUser.save();
                return res.status(201).send("User created successfully");
            } else {
                return res.status(403).send("You forgot to write name !!");
            }
        } catch (error) {
            console.log("error at createUser : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    getUser: async (req, res) => {
        try {
            let id = req.params.id || undefined;
            if (id && ObjectId.isValid(id)) {
                let user = await User.findById(id);
                return res.status(200).send(user ? user : {});
            } else {
                return res.status(403).send("Something is wrong with userId !!");
            }
        } catch (error) {
            console.log("error at getUser : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    getFavouriteRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            if (userId && ObjectId.isValid(userId)) {
                let user = await User.findById(userId);
                let favouriteRestaurants = await Restaurant.find({
                    _id: { $in: user.favouriteRestaurants },
                });
                return res.status(200).send(favouriteRestaurants);
            } else {
                return res.status(403).send("Something is wrong with user id !!");
            }
        } catch (error) {
            console.log("error at getFavouriteRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    getBlacklistRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            if (userId && ObjectId.isValid(userId)) {
                let user = await User.findById(userId);
                let blacklistRestaurants = await Restaurant.find({
                    _id: { $in: user.blacklistRestaurants },
                });
                return res.status(200).send(blacklistRestaurants);
            } else {
                return res.status(403).send("Something is wrong with user id !!");
            }
        } catch (error) {
            console.log("error at getBlacklistRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    addFavouriteRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            let restaurantId = req.params.id || undefined;
            if (!userId || !ObjectId.isValid(userId)) {
                return res.status(403).send("Something is wrong with userId !!");
            }

            if (!restaurantId || !ObjectId.isValid(restaurantId)) {
                return res.status(403).send("Something is wrong with restaurant Id  !! ");
            }
            if (userId && restaurantId) {
                let restaurant = await Restaurant.findById(restaurantId);
                let user = await User.findById(userId);
                if (!restaurant) {
                    return res.status(403).send("Restaurant Id is not correct !! ");
                }
                user.favouriteRestaurants.push(restaurantId);
                await user.save();
                return res.status(201).send(user.favouriteRestaurants);
            }
        } catch (error) {
            console.log("error at addFavouriteRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    addBlackRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            let restaurantId = req.params.id || undefined;
            if (!userId || !ObjectId.isValid(userId)) {
                return res.status(403).send("Something is wrong with userId !!");
            }

            if (!restaurantId || !ObjectId.isValid(restaurantId)) {
                return res.status(403).send("Somenthing is wrong with restaurant Id !! ");
            }
            if (userId && restaurantId) {
                let restaurant = await Restaurant.findById(restaurantId);
                let user = await User.findById(userId);
                if (!restaurant) {
                    return res.status(403).send("Restaurant Id is not correct !! ");
                }
                user.blacklistRestaurants.push(restaurantId);
                user.favouriteRestaurants = _.reject(user.favouriteRestaurants, function (
                    favtRestaurantId
                ) {
                    return favtRestaurantId === restaurantId;
                });
                await user.save();
                return res.status(201).send(user.blacklistRestaurants);
            }
        } catch (error) {
            console.log("error at addBlackRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    removeFavouriteRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            let restaurantId = req.params.id || undefined;
            if (!userId || !ObjectId.isValid(userId)) {
                return res.status(403).send("Something is wrong with userId !!");
            }

            if (!restaurantId || !ObjectId.isValid(restaurantId)) {
                return res.status(403).send("Somenthing is wrong with restaurant Id !! ");
            }

            if (userId && restaurantId) {
                let restaurant = await Restaurant.findById(restaurantId);
                let user = await User.findById(userId);
                if (!restaurant) {
                    return res.status(403).send("Restaurant Id is not correct !! ");
                }
                user.favouriteRestaurants = _.reject(user.favouriteRestaurants, function (
                    favtRestaurantId
                ) {
                    return restaurantId === favtRestaurantId;
                });
                await user.save();
                return res.status(201).send(user.favouriteRestaurants);
            }
        } catch (error) {
            console.log("error at removeFavouriteRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    removeBlacklistRestaurant: async (req, res) => {
        try {
            let userId = req.params.userId || undefined;
            let restaurantId = req.params.id || undefined;
            if (!userId || !ObjectId.isValid(userId)) {
                return res.status(403).send("Something is wrong with userId !!");
            }

            if (!restaurantId || !ObjectId.isValid(restaurantId)) {
                return res.status(403).send("Somenthing is wrong with restaurant Id !!  ");
            }
            if (userId && restaurantId) {
                let restaurant = await Restaurant.findById(restaurantId);
                let user = await User.findById(userId);
                if (!restaurant) {
                    return res.status(403).send("Restaurant Id is not correct !! ");
                }
                user.blacklistRestaurants = _.reject(user.blacklistRestaurants, function (
                    blacklistRestaurantId
                ) {
                    return blacklistRestaurantId === restaurantId;
                });
                await user.save();
                return res.status(201).send(user.blacklistRestaurants);
            }
        } catch (error) {
            console.log("error at removeBlacklistRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },
};
