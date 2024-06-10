const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        const user = await User.findById(token_decode.id);
        console.log({check:token_decode.id});
        if(!user) return res.status(404).json({ success: false, message: "User not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error" });
    }
};

const authCustom = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        const user = await User.findById(token_decode.id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error" });
    }
};


module.exports = authMiddleware; 