const express= require("express");
const { getAllUsersController,  getAllDoctorsController, changeAccountStatusController} = require("../controller/adminController.js");

const authMiddleware = require("../midlewares/authMiddleware");
const router= express.Router(); //Router object


//routes
//GET || users 
router.get('/getAllUsers', authMiddleware, getAllUsersController );

//GET || doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController );

//POST || change status
router.get('/changeAccountStatus',authMiddleware, changeAccountStatusController)

module.exports=router;