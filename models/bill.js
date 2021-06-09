const mongoose = require('mongoose');
const BillSchema = mongoose.Schema({
    billNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    customerType: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String
    },
    billHtml: {
        type: String,
        required: true
    },
    products: [{
        type: String
    }],
    quantity: {
        type: String
    }
});

const Bill = module.exports = mongoose.model('Bill', BillSchema);