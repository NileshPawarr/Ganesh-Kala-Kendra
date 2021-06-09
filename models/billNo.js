 const mongoose = require('mongoose');

const BillNoSchema = mongoose.Schema({
    billNo: {
        type: Number,
        required: true
    },
    custType: {
        type: String
    }
});

const BillNo =  module.exports = mongoose.model('BillNo', BillNoSchema);