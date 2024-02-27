import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/online_payment', { useNewUrlParser: true })
.catch((e) => console.log(`Error connecting to db: ${e}`));
;

module.exports = { mongoose };
