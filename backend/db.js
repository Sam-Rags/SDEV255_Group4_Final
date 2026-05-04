const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
require("dotenv").config()
const uri = process.env.MONGODB_URI
// Credentials moved to .env to prevent exposure in source control

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
