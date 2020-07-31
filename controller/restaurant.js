const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const _ = require("underscore");

module.exports = {
    setupDummyRestaurants: async (req, res) => {
        try {
            const restaurats = [
                {
                    name: "singh dhaba",
                    city: "delhi",
                    country: "india",
                    pincode: 110075,
                    coordinates: [77.0449321, 28.5953364],
                    open: true,
                },
                {
                    name: "apni rasoi",
                    city: "delhi",
                    country: "india",
                    pincode: 110075,
                    coordinates: [77.0361773, 28.5953349],
                    open: true,
                },
                {
                    name: "nine to eleven",
                    city: "noida",
                    country: "india",
                    pincode: 201304,
                    coordinates: [77.4977619, 28.481032],
                    open: true,
                },
                {
                    name: "keventers",
                    city: "delhi",
                    country: "india",
                    pincode: 110095,
                    coordinates: [77.3044073, 28.6593917],
                    open: true,
                },
                {
                    name: "haldiram",
                    city: "gurugram",
                    country: "india",
                    pincode: 122001,
                    coordinates: [76.9870044, 28.4016974],
                    open: false,
                },
                {
                    name: "kfc",
                    city: "mumbai",
                    country: "india",
                    pincode: 400050,
                    coordinates: [72.8319895, 19.0654852],
                    open: true,
                },
                {
                    name: "mcdonalds",
                    city: "mumbai",
                    country: "india",
                    pincode: 400086,
                    coordinates: [72.7416998, 19.0912233],
                    open: true,
                },
                {
                    name: "hoodiz",
                    city: "mumbai",
                    country: "india",
                    pincode: 400013,
                    coordinates: [72.7416994, 19.0917663],
                    open: true,
                },
                {
                    name: "fast trax",
                    city: "delhi",
                    country: "india",
                    pincode: 110005,
                    coordinates: [77.1663382, 28.6008434],
                    open: false,
                },
                {
                    name: "burger king",
                    city: "delhi",
                    country: "india",
                    pincode: 110058,
                    coordinates: [77.1663381, 28.6009851],
                    open: true,
                },
            ];
            for (let restaurant of restaurats) {
                let tempRestaurant = new Restaurant({
                    name: restaurant.name,
                    city: restaurant.city,
                    country: restaurant.country,
                    pincode: restaurant.pincode,
                    open: restaurant.open,
                    location: {
                        coordinates: restaurant.coordinates,
                    },
                });
                await tempRestaurant.save();
            }
            return res.status(201).send("Restaurants created successfully");
        } catch (error) {
            console.error("error at setupDummyRestaurants : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },

    searchRestaurant: async (req, res) => {
        try {
            let userId = req.body.userId || undefined;
            let pincode = req.body.pincode || undefined;
            let city = req.body.city || undefined;
            let open = req.body.open || undefined;
            let country = req.body.country || undefined;
            let longitude = req.body.longitude || undefined;
            let latitude = req.body.latitude || undefined;
            let distanceFlag = req.body.distanceFlag || false;
            if (!userId) {
                return res.status(403).send("You missed to put your userId !!");
            } else {
                let query = {};
                if (pincode) {
                    query.pincode = pincode.trim();
                }
                if (city) {
                    query.city = city.toLowerCase().trim();
                }
                if (country) {
                    query.country = country.toLowerCase().trim();
                }
                if (open) {
                    query.open = open;
                }
                if (distanceFlag && longitude && latitude) {
                    query.location = {
                        $geoWithin: {
                            $centerSphere: [[longitude, latitude], process.env.RANGE / 3963.2],
                        },
                    };
                }
                let filterRestaurants = await Restaurant.find(query);
                if (filterRestaurants.length > 0) {
                    let user = await User.findById(userId);
                    filterRestaurants = _.reject(filterRestaurants, function (restaurant) {
                        return _.find(user.blacklistRestaurants, function (blacklisted) {
                            return blacklisted == restaurant._id;
                        });
                    });
                }
                return res.status(200).send(filterRestaurants);
            }
        } catch (error) {
            console.error("error at searchRestaurant : ", error);
            return res.status(500).send("Something went wrong !!");
        }
    },
};
