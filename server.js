require("dotenv").config();
require('./config/dbConn');
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())
app.use(cookieParser());

// Log the request body after parsing
// app.use((req, res, next) => {
//     console.log('Request body:', req.body);
//     next();
// });

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});