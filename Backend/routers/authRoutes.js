const express = require("express");
const upload  = require("../middlewares/uploadMiddleware.js");

const {
    registerUser,
    loginUser,
    getUserInfo,
    uploadImage
} = require("../controllers/authController.js")
const {protect} = require("../middlewares/authmiddleware.js")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/getuser", protect, getUserInfo);

router.post('/upload-image', upload.single("image"), protect, uploadImage);

module.exports = router;