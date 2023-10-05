import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js";



export const signup = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    // hash password
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username, email, password: hashedPassword,
    })

    try {
        await newUser.save()

        res.status(201).json({
            message: "user Created successfully"
        })

    } catch (error) {
        next(error);
    }
}


export const signin = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {

        const validUser = await User.findOne({ email });


        if (!validUser) return next(errorHandler(404, "User not found"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

        // generating token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        validUser.password = undefined;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser)
    } catch (error) {
        next(error);
    }

};


export const google = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            user.password = undefined;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(user)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            })
            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            newUser.password = undefined;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(newUser)

        }
    } catch (error) {
        console.log(error);
    }
}