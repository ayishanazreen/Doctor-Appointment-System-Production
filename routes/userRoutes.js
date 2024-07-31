const express= require("express");
const { loginController, registerController, authController, getAllDoctorsController, bookAppointmentController, bookAvailableController, userAppointmentsController } = require("../controller/userController");
const authMiddleware = require("../midlewares/authMiddleware");
const router= express.Router(); //Router object
const {applyDoctorController} = require("../controller/applyDoctorController");
const {getAllNotificationController, deleteAllNotificationController} = require("../controller/NotificationController");

//routes
//login || POST 
router.post('/login', loginController);

//Register || POST
router.post('/register',registerController);

//Auth || Post
router.post('/getUserData', authMiddleware, authController);


//Apply-doctor || Post
router.post('/apply-doctor', authMiddleware, applyDoctorController);

//get all Notification doctor || Post
router.post('/get-all-notification', authMiddleware, getAllNotificationController);


//delete all Notification doctor || Post
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

//get doc details
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//book appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//booking availability
router.post('/book-availability', authMiddleware, bookAvailableController);

//Appointment lists
router.get('/user-appointment', authMiddleware, userAppointmentsController);
module.exports=router;