const MongoClient = require("mongodb").MongoClient;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const PROD_URI = process.env.PROD_DB_URI;
// const MKTG_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"

var dbs = {
  production: {},
};

function connect(url) {
  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      {
        console.log("Connected successfully to server");
        console.log("this must be first");
        return client.db();
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

exports.initdb = async function () {
  let database = await connect(PROD_URI);
  // await database.collection("positions").dropIndex("time_1");
  // database
  //   .collection("positions")
  //   .createIndex({ time: 1 }, { expireAfterSeconds: 172800 });
  await database.collection("connections").dropIndex("time_1");
  database
    .collection("connections")
    .createIndex({ time: 1 }, { expireAfterSeconds: 1200 });
  dbs.production = database;
};

exports.dbs = dbs;
