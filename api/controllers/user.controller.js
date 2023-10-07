import User from "../models/User.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
export const userController = (req, res) => {
    res.send("router test")
}

export const updateUserCtrl = async (req, res, next) => {
    console.log(req.user.id, req.params.id)
    if (req.user.id != req.params.id) return next(errorHandler(401, "Unauthorized"))

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

        updatedUser.password = undefined

        res.status(200).json(updatedUser)

    } catch (error) {
        next(error)
    }
}