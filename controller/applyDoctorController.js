const doctorModel=require('../models/Doctor');
const userModel=require('../models/userModel');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');


const applyDoctorController = async (req,res) => {
 try {
    const newDoctor= await doctorModel({...req.body, status:"pending"});
    await newDoctor.save();
    const adminUser= await userModel.findOne({isAdmin:true});
   const notification=adminUser.notification;
    notification.push({
        type:"apply-doc-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor Account`,
        data: {
           doctorId: newDoctor._id,
           name : newDoctor.firstName+" "+newDoctor.lastName,
           onClickPath: "/admin/doctors"
       }
        })
        await userModel.findByIdAndUpdate(adminUser._id ,{notification})
        res.status(201).send({
            success:true,
            message:"Doctor Applied Sucessfully"
        })

 } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"Error while applying doctor"
    })
 }

}

module.exports={applyDoctorController};
