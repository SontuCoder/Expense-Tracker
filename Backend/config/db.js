const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log(`✅ MongoDB Connected.`);
    } catch (err) {
        console.error(`❌ MongoDB Connection failed:- ${err}`);
        process.exit(1);
    }
};

module.exports = connectDB;