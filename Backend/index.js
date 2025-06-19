const express = require('express');
require("dotenv").config();
const cors = require('cors');
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routers/authRoutes.js");
const incomeRoutes = require("./routers/incomeRoutes.js");
const expenseRoutes = require("./routers/expenseRoutes.js");
const dashboardRoutes = require("./routers/dashboardRoutes.js");


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: [ "GET", "POST", "PUT", "DELETE"],
    allowedHeaders :["Content-Type", "Authorization"],
    credentials: true
}));

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});