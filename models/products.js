const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number
    },
    rate: {
        type: Number,
        required: true
    }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);