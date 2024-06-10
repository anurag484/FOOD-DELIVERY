const express= require("express")
const { loginUser,registerUser, me } = require ("../controllers/userController.js")
const authMiddleware = require ("../middleware/auth.js")
const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get('/me', authMiddleware, me);
module.exports = userRouter