const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to the Database Successfully");
    })
    .catch((err) => {
      console.log("Error while connecting to the Database", err);
    });
}

module.exports = connectDB;
