// const mongodb = require('mongodb')
// import mongoose from './node_modules/mongoose/types/index.d';
// const mongoclient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const mongoose = require("mongoose");

let database;
async function getdatabase() {
  /// to normal mongodb local
  //   const client = await mongoclient.connect('mongodb://127.0.0.1:27017');
  //   database = client.db('library');
  //   if (!database) {
  //       console.log("databse not connected")
  //   }
  //   return database;
  // To use mongoose
  mongoose
    .connect("mongodb://127.0.0.1:27017/library")
    .then(() => {
      console.log("DataBase Connection is sucessfull");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getdatabase,
  // No need object id in mongoose
  // ObjectId,
};
