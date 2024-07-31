const doctorModel =require('../models/Doctor');
const appointmentModel=require('../models/appointmentModel');
const userModel = require('../models/userModel');

const getDoctorInfoController = async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:"doctor record is fetched from db",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting a doctor details",
            error,
        })
        
    }

}

const updateProfileController = async(req,res) => 
{
try {
    const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body)
    res.status(201).send({
        success:true,
        message:("doctor profile is updated"),
        data:doctor
    })

    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error on updating profile",
        error,
    })
    
}
}
const getDoctorByIdController = async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
         success:true,
         message:"fetched doct details by id",
         data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while fetching doctor by id"
        })
    }

}

const getDoctorAppointmentController = async(req,res)=>
{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        const appointments=await appointmentModel.find({doctorId:doctor._id})
        res.status(200).send({
            success:true,
            message:"Doctor appointments fetched successfully",
            data:appointments
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in get doctor controller"
        })
        
    }

}

const updateDocAppointmentStatusController = async(req,res)=>
{
try {
    const {appointmentId, status}=req.body
    const appointments=await appointmentModel.findByIdAndUpdate(appointmentId, {status})
    const user= await userModel.findOne({_id:appointments.userId})
    const notification=user.notification
    notification.push({
       type:'status- updated',
       message:`you appoinment status is updated to ${status}`,
       onClickPath:'/doctor-appointments'
   })
   await user.save();
   res.status(200).send({
    success:true,
    message:"Status updated",
   })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in update status doc controller"
    })
    
}
}

module.exports={getDoctorInfoController , 
    updateProfileController, 
    getDoctorByIdController, 
    getDoctorAppointmentController,
    updateDocAppointmentStatusController };