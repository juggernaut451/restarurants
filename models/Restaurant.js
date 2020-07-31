const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    createdAt: { type: String, default: Date.now, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
    },
    open: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
