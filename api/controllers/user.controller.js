import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js"
import User from '../models/User.model.js';

export const userController = (req, res) => {
    res.send("router test")
}


// Update user controller
export const updateUser = async (req, res, next) => {

    if (req.user.id != req.params.id) return next(errorHandler(401, "Unauthorized"));


    try {

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }


        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        console.log(updatedUser)

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest)


    } catch (error) {
        next(error)
    }
}