const express = require("express");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController.js")
const {protect} = require("../middlewares/authmiddleware.js")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("getUser", protect, getUserInfo);

module.exports = router;