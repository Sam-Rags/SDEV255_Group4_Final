const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const uri = "mongodb+srv://sdev255:bzX3Nx5oAlvvVXxr@sdev255-group4-db.cuhjnr4.mongodb.net/?appName=sdev255-group4-db";

async function run() {
  try {
    mongoose.connect(uri).then(() => console.log('Connected to MongoDB...'))
  }
  catch(err) {
    console.log("Could not connect to DB...", err)
  }
}
run().catch(console.dir);
module.exports = mongoose;
