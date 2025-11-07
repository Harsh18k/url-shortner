const mongoose = require("mongoose");

async function connectToMongoDB() {
    const url = process.env.MONGODB_URI; // ensure your .env uses MONGODB_URI
    if (!url) {
        console.error("MongoDB URI missing in .env!");
        process.exit(1);
    }

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

module.exports = { connectToMongoDB };