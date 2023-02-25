var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
const passport = require("../middleware/passportJWT")
const checkadmin = require("../middleware/checkAdmin")
const { body } = require('express-validator')


router.get("/", usersController.showall);

router.post("/", [
    body('name').not().isEmpty().withMessage("Please enter your name").isLength({ min: 3 }).withMessage("The name must be more than 3 characters."),
    body('email').not().isEmpty().withMessage("Please enter your email").isEmail().withMessage("Email is incorrect"),
    body('password').not().isEmpty().withMessage("Please enter your password").isLength({ min: 5 }).withMessage("The password must be more than 5 characters.")]
    , usersController.register)

router.post("/login", [
    body('email').not().isEmpty().withMessage("Please enter your email").isEmail().withMessage("Email is incorrect"),
    body('password').not().isEmpty().withMessage("Please enter your password").isLength({ min: 5 }).withMessage("The password must be more than 5 characters.")]
    , usersController.log)




module.exports = router;

// ,[passport.islogin, checkadmin.isAdmin]