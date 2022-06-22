// connect to database(mongoDB) via mongoose library
const mongoose = require('mongoose')

// connection class
class Database {
  // constructor
  constructor() {
    this.connect()
  }

  connect() {
    // connect to DB
    mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.KEY}@100devs-content.vsgn9.mongodb.net/100devsDB`)
    .then(() => {
      console.log('Connected to DB')
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

// export Database class
module.exports = new Database()