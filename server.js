require("dotenv").config();
require('./config/dbConn');
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api',routes);

app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
});
