const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var FlightSchema = new Schema({
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    departTime: {type: String},
    arrivalTime: {type: String},
    flightNumber: {type: String},
    flightDate: {type: Date},
    price: {type: Number},
    seatsAvailable: {type: Number},
}, {timestamps: true});

module.exports = mongoose.model("flight", FlightSchema)