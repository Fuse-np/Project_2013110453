const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const passport = require("../middleware/passportJWT")
const checkadmin = require("../middleware/checkAdmin")
const {body}= require("express-validator")

// pet //
//insert
router.post ("/",productController.insertpet);
//show pet
router.get("/", productController.pet);

// Product //
//insert product
router.post ("/:id",productController.insert);
//Show product by ID
router.get("/:id", productController.show);
//show all 
router.get("/",productController.showall);
//delete
router.delete ("/:id",productController.destroy);
//update
router.put ('/:id',productController.update)

module.exports = router;

//,[passport.islogin,checkadmin.isAdmin]