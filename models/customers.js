const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

