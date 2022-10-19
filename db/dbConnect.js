require('dotenv').config()
const mongoose = require("mongoose");


async function dbConnect() {
  mongoose
    .connect(
        process.env.DB_URL, //this is the DB_URL from mongoose
      {
        //   these are options to ensure that the connection is done properly
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => { //debug msgs
      console.log("Successfully connected Mongo!!!!!");
    })
    .catch((error) => {
      console.log("ERROR in Mongo connection!!!");
      console.error(error);
    });
}

module.exports = dbConnect;