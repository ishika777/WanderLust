const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");
// const Translation = require("../models/translation.js");

const axios = require('axios');


//mongoose setup
main()
.then(() => console.log("connected to db"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : '671e78fd7127552233f16af0'}));
    await Listing.insertMany(initData.data);
    console.log("data initialised")
};

initDb();