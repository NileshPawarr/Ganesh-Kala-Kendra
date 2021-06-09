//importing modules
var express = require('express'),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),

    app = express();





const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/customerlist');

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connnected to database');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database Connnection: ' + err);
    }
});

//port number
const port = 3000;

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

app.get('/', (req, res) => {

    res.send('I am response');
});

app.listen(port, () => {
    console.log('Server started at port' + port);
});



//url encode instalation need to use $ npm install urlencode