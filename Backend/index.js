const express = require('express');
require("dotenv").config();
const cors = require('cors');
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: [ "GET", "POST", "PUT", "DELETE"],
    allowedHeaders :["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

connectDB();

app.use("/api/v1/auth", authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});