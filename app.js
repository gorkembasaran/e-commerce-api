const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors())

const api = process.env.API_URL;
const productsRouter = require('./routers/products')
const ordersRouter = require('./routers/orders')
const usersRouter = require('./routers/users')
const categoriesRouter = require('./routers/categories');
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

// middleware
app.use(bodyParser.json()); 
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)

// routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database connection is succesfully')
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log(api)
    console.log('server is running http://localhost:3000');
})