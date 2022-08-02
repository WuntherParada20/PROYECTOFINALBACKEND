const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

let db = null;
let client = null;

const getDb = async () => {
    if ( db ) {
        return db;
    }

    if( !client) {
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    db = client.db();
    return db;
}

module.exports = { getDb };
