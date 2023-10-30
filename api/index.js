import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());



// mongodb connection settings
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connection established")
}).catch((err) => {
    console.log(err)
});


// user routes configuration
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)


// Middlewaare routes
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })

})




app.listen(3000, () => {
    console.log("Server is listening on 3000")
})

