const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.log('Momgo DB connect error'.bgRed.white);
    }
}

module.exports = connectDB;