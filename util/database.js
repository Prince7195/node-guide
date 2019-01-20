const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    MongoClient.connect(
        "mongodb+srv://user:user@cluster0-uyecl.mongodb.net/shop?retryWrites=true",
        { useNewUrlParser: true })
        .then(client => {
            console.log("Mongo Atlas Connected");
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No DB found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;