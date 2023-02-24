const User = require("../models/user")
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const config = require("../config/index")

exports.showuser = async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({
        user: user
    })
}


exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Insert is incorrect")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        let user = new User();
        user.name = name;
        user.email = email;
        user.password = await user.encryptPassword(password);
        await user.save();

        res.status(200).json({
            message: "Register successfully",
        });
    } catch (error) {
        next(error)
    }

}

exports.log = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Data not correct")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("Data not found");
            error.statusCode = 404;
            throw error;
        }

        const existEmail = await User.findOne({ email: email })
        if (!existEmail) {
            const error = new Error("Data not found")
            error.statusCode = 404
            throw error;
        }
        const isValid = await existEmail.checkPassword(password)
        if (!isValid) {
            const error = new Error("Password not correct")
            error.statusCode = 401
            throw error;
        }
        const token = await jwt.sign({
            id: user._id,
            role: user.role,
        }, config.JWT_SECRET, { expiresIn: "5 days" })

        const expires_in = jwt.decode(token)

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        });
    } catch (error) {
        next(error);
    }
};