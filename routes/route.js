const express = require('express');
const router = express.Router();

const Customer = require('../models/customers');
const Product = require('../models/products');
const Bill = require('../models/bill');
const BillNo = require('../models/billNo');

const http = require('http');
const urlencode = require('urlencode');

const username = 'dbabhulkar@gmail.com';
const hash = '7ccbedd47895139955de5a87c241323a34fb53ff89bfda144fff89385a4ebb88';//'Dibakar@220165'; // The hash key could be found under Help->All Documentation->Your hash key. Alternatively you can use your Textlocal password in plain text.

const sender = 'txtlcl';


//retriving data
router.get('/customers', (req, res, next) => {
    Customer.find((err, customers) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(customers);
        }
    });
});

//add customer
router.post('/customer', (req, res, next) => {
    let newCustomer = new Customer({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });
    newCustomer.save((err, customer) => {
        if (err) {
            return res.status(500).send(err);
            //res.json({ msg: 'Failed to add customer' });
        }
        else {
            return res.status(200).send({ msg: 'Customer added successfully' });
        }
    });
});

//Delete customer
router.delete('/customer/:id', (req, res, next) => {
    Customer.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
            // res.json({ msg: 'Failed to delete customer' });
        }
        else {
            return res.status(200).send({ msg: 'Customer deleted successfully', status: 200 });
        }
    });
});

//retriving data
router.get('/products', (req, res, next) => {
    Product.find((err, products) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(products);
        }
    });
});

//add product
router.post('/product', (req, res, next) => {
    let newProduct = new Product({
        name: req.body.name,
        // quantity: req.body.quantity,
        rate: req.body.rate
    });
    newProduct.save(err => {
        if (err) {
            return res.status(500).send(err);
            // res.json({ msg: 'Failed to add product' });
        }
        else {
            return res.status(200).send(newProduct); //res.json({ msg: 'Product added successfully' });
            // return res.json({ status: 200, msg: 'Product added successfully', body: res.body }); //res.json({ msg: 'Product added successfully' });

        }
    });
});

//Delete customer
router.delete('/product/:id', (req, res, next) => {
    Product.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
            //res.json({ msg: 'Failed to delete product' });
        }
        else {
            return res.status(200).send({ msg: 'Product deleted successfully', status: 200 });
            //res.json({ msg: 'Product deleted successfully' });
        }
    });
});

router.post('/product/:id', (req, res, next) => {
    Product.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send({ status: 200, newObj: todo });
        }
    )
});

//retriving data
router.get('/getBillNo/:custType', (req, res, next) => {
    var query = { 'custType': req.params.custType };
    BillNo.find(query, function (err, bills) {
        if (err || !bills) {
            return next(err);
        }
        else {
            res.send(bills);
        }
    });

    /* BillNo.find((err, billNo) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(billNo[0]);
        }
    }); */
});

//add bill No
 router.post('/billNo', (req, res, next) => {
    let newBillNo = new BillNo({
        billNo: req.body.billNo,
        custType: req.body.custType
    });
    newBillNo.save((err, billNo) => {
        if (err) {
            return res.status(500).send(err);
            //res.json({ msg: 'Failed to add customer' });
        }
        else {
            return res.status(200).send(billNo);
        }
    });
});


router.post('/updateBillNo/:id', (req, res, next) => {
    BillNo.findByIdAndUpdate(
        // the id of the item to find
        //'5b24abeae639632430518578',
        req.params.id,
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send({ status: 200, newObj: todo });
        }
    )
});


router.post('/saveBill', (req, res, next) => {
    let newBill = new Bill({
        billNo: req.body.billNo,
        name: req.body.name,
        customerType: req.body.customerType,
        createdDate: req.body.createdDate,
        deliveryDate: req.body.deliveryDate,
        billHtml: req.body.billHtml,
        products: req.body.products
    }),

        callback = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
            });
        };

    const msg = urlencode('Dear customer, \nyour order placed with Ganesh Kala Kendra of ₹' + req.body.totalAmt + '\nThank you, \nGanesh Kala Kendra');
    const number = req.body.mobileNo;
    const data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + number + '&message=' + msg;
    const options = {
        host: 'api.textlocal.in',
        path: '/send?' + data
    };

    // http.request(options, callback).end();

    newBill.save(err => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(newBill);
        }
    });
});

//Delete Bill
router.delete('/deleteBill/:id', (req, res, next) => {
    Bill.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
            //res.json({ msg: 'Failed to delete product' });
        }
        else {
            return res.status(200).send({ msg: 'Bill deleted successfully', status: 200 });
            //res.json({ msg: 'Product deleted successfully' });
        }
    });
});

router.get('/getWholesaleBills', (req, res, next) => {
    var query = { 'customerType': 'Wholesale' };
    Bill.find(query, function (err, bills) {
        if (err || !bills) {
            return next(err);
        }
        else {
            res.send(bills);
        }
    });
});


router.get('/getRetailBills', (req, res, next) => {
    var query = { 'customerType': 'Retail' };
    Bill.find(query, function (err, bills) {
        if (err || !bills) {
            return next(err);
        }
        else {
            res.send(bills);
        }
    });
});

module.exports = router;