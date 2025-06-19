const express = require("express")
const router = express.Router();

const { protect } = require("../middlewares/authmiddleware.js");
const { getDasboardData } = require("../controllers/dashboardController.js");

router.get("/", protect, getDasboardData);

module.exports = router;