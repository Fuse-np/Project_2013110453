const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const passport = require("../middleware/passportJWT")
const checkadmin = require("../middleware/checkAdmin")
const {body}= require("express-validator")

// pet //
//insert
router.post ("/",[passport.islogin,checkadmin.isAdmin],productController.insertpet);
//show pet
router.get("/", productController.pet);

// Product //
//insert product
router.post ("/:id",[passport.islogin,checkadmin.isAdmin],productController.insert);
//Show product by ID
router.get("/:id",productController.show);
//delete
router.delete ("/:id",[passport.islogin,checkadmin.isAdmin],productController.destroy);
//update
router.put ('/:id',[passport.islogin,checkadmin.isAdmin],productController.update)

module.exports = router;

