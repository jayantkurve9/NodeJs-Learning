const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://Jayant:EtQ0tiHYdgml5SPu@cluster0.nl6148i.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
    )
        .then((client) => {
            console.log("Connected!");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            console.log("Error", err);
            // throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
