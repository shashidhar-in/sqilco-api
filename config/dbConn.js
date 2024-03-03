const mongoose = require("mongoose");
const url = process.env.MONGO_URL

mongoose.connect(url).then(()=>{
    console.log("MongoDb Connect");
}).catch((err)=>{
    console.log('Error connecting to MongoDB',err);
})
