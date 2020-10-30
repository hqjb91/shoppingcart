// Loading libraries
const express = require('express');
const hbs = require('express-handlebars');
require('dotenv').config();

// Store list in server
const itemList = [];

// Configure the port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// Instantiate express
const app = express();

// Configure handlebars
app.engine('hbs', hbs({
    defaultLayout : 'main.hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/static'));

// Configure the routes

app.get('/', (req, res) => {
    const cartState = [];
    res.status(200);
    res.type('text/html');
    res.render('index' , {cartState : JSON.stringify(cartState)});
});

app.post('/', express.urlencoded({extended:true}), (req, res) => {

    const { item, quantity, unitprice, cartstate } = req.body;

    const itemList = JSON.parse(cartstate);

    itemList.push({item, quantity, unitprice});

    res.status(201);
    res.type('text/html');
    res.render('index' , {itemList:itemList, cartState:JSON.stringify(itemList)});
});

// Start the server
app.listen(PORT, () => {
    console.log(`You have connected on port : ${PORT} at ${new Date()}`);
});