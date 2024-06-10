const express = require( "express")
const cors = require( "cors")
const { connectDB } = require( "./config/db.js")
const foodRouter = require( "./routes/foodRoute.js")
const userRouter = require( "./routes/userRoute.js")
const cartRouter = require( "./routes/cartRoute.js")
const orderRouter = require( "./routes/orderRoute.js")
const paymentRouter = require( "./routes/paymentRoute.js")
// app config
require('dotenv').config({path:"./.env"})
const app=express()
const port=4000

// middleware
app.use(express.json())
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Replace with your Vite development server URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/pay",paymentRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


