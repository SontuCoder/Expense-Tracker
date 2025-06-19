const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const genereteToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImgUrl:profileImageUrl
        });

        const token = genereteToken(user._id);
        res.status(201).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImgPic: user.profileImgUrl,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = genereteToken(user._id);
        res.status(200).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImgPic: user.profileImgUrl,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImgPic: user.profileImgUrl
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }
        const imageUrl = req.file.path;
        const userId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImgUrl : imageUrl }
        ).select("-password"); 

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};