const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    favouriteRestaurants: [String],
    blacklistRestaurants: [String],
});

module.exports = mongoose.model("User", userSchema);
