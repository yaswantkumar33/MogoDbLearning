const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

let database;
async function getdatabase() {
    const client = await mongoclient.connect('mongodb://127.0.0.1:27017');
    database = client.db('library');
    if (!database) {
        console.log("databse not connected")
    }
    return database;

}

module.exports = {
    getdatabase,
    ObjectId
}