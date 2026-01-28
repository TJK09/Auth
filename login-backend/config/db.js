const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MongoDbURI)
        console.log("Database Connected", mongoose.connection.name)
    }catch(error){
        console.error("Database cant Connect", error)
        process.exit(1)
    }
}

module.exports = connectDB