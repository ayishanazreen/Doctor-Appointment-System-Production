const express= require("express");
const {getDoctorInfoController, updateProfileController, getDoctorByIdController, getDoctorAppointmentController, updateDocAppointmentStatusController} = require('../controller/doctorController');
const authMiddleware = require("../midlewares/authMiddleware");
const router= express.Router()


//post single doc details
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

//POST Update Doc Info
router.post('/updateDocInfo',authMiddleware, updateProfileController);

//POST get doct by id 
router.post('/getDoctorById/', authMiddleware, getDoctorByIdController);

//Get appointments
router.get('/getDoctorAppointments', authMiddleware, getDoctorAppointmentController)

//Post update status
router.post('/updateDocAppointmentStatus', authMiddleware, updateDocAppointmentStatusController)

module.exports = router;