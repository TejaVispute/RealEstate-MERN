import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
dotenv.config()
const app = express();




// mongodb connection settings
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connection established")
}).catch((err) => {
    console.log(err)
});


// user routes configuration
app.use("/api/user", userRouter)

app.listen(3000, () => {
    console.log("Server is listening on 3000")
})

