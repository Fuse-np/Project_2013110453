const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const passport = require("../middleware/passportJWT")
const checkadmin = require("../middleware/checkAdmin")
const {body}= require("express-validator")

router.post ("/",productController.insertpet);

router.post ("/:id",productController.insert);

router.get("/one/:id", productController.showOne);

router.delete ("/:id",productController.delete);
router.put ('/:id',productController.update)

router.get("/", productController.pet);

module.exports = router;

//[passport.islogin,checkadmin.isAdmin]