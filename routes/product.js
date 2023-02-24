const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const passport = require("../middleware/passportJWT")
const checkadmin = require("../middleware/checkAdmin")
const {body}= require("express-validator")

//insert
router.post ("/",productController.insertpet);
//show pet
router.get("/", productController.pet);
//insert product
router.post ("/:id",productController.insert);
//insert product
router.get("/one/:id", productController.getproductOne);
//delete
router.delete ("/:id",productController.delete);
//update
router.put ('/:id',productController.update)


module.exports = router;

//[passport.islogin,checkadmin.isAdmin] ทำแล้วมันเด้งerrorว่าไม่มีสิทครับ