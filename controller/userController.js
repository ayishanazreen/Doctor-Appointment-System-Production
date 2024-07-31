const User=require('../models/userModel');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const doctorModel = require('../models/Doctor');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel');
const moment =require('moment');

const loginController = async(req,res) => 
{
try 
{
  const user= await User.findOne({email:req.body.email});
  if(!user)
   {
      return res.status(404).send({message: "User Not found", success:false});
   }
   const iMatch= await bcrypt.compare(req.body.password, user.password);
   if(!iMatch)
   {
    return res.status(401).send({message:"Invalid email or pwd", success:false});
   }
   const token= jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
   res.status(200).send({message:"login successfully", success:true, token});
}
 catch (error) 
{
   console.log(error);
   res.status(500).send({message:`error in logic controller ${error.message}`})
}
}

//register
const registerController = async(req,res) => 
{
   try {
    const existingUser= await User.findOne({email:req.body.email})
    if(existingUser) {
       return res.status(200).send({message: "User already exist", success:false});
    }
    //hashing the password
    const password=req.body.password;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    req.body.password=hashedPassword;
    
    //creating new user in model
    const newUser= new User(req.body);
    await newUser.save();
    res.status(201).send({message: "Registered Successfully", success:true});
   } 
   catch (error) {
    console.log(error);
    res.status(500).send({success:false, message: `Register Controller ${error.message}`});
   }
}

const authController = async(req, res)=>{

   try {
      const user=await User.findOne({_id:req.body.userId});
        //After finding the user, the password field is set to undefined to avoid sending it back in the response.
      // This enhances security by ensuring sensitive information is not exposed.
      user.password=undefined;   
      if(!user)
      {
      return res.status(401).send({message: "user not found", success: false })
      }
      else
      {
         res.status(200).send({
            success:true,
            data:user
         })
      }    
   }
    catch (error) {
      console.log(error);
      res.status(500).send({message:`error in Auth controller ${error.message}`,success:false ,error})
   }
}


const getAllDoctorsController =async(req,res)=>
{
try {
   const doctors =await doctorModel.find({status:'approved'})
   res.status(200).send({
      success:true,
      message:"get doc details",
      data:doctors
   })
   
} catch (error) {
  
   console.log(error) 
   res.status(500).send({
      success:false,
      error,
      message:"error while fetching doc details"
   })
}
}

const bookAppointmentController = async(req,res)=>{
   try {
      req.body.date=moment(req.body.date, 'DD-MM-YYYY').toISOString();
      req.body.time=moment(req.body.time, 'HH:mm').toISOString();
      req.body.status="pending";
      const newAppointment= new appointmentModel(req.body);
      await newAppointment.save();
      const user= await userModel.findOne({_id:req.body.doctorInfo.userId})
      user.notification.push({
         type:'new-appointment-request',
         message:`A new appointment request from ${req.body.userInfo.name}`,
         onClickPath:'/user/appointments'
     })
     await user.save();
     res.status(200).send({
      success:true,
      message:'Appointment Book successfully'
     })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"error while booking"
      })
      
   }
};


const bookAvailableController = async (req, res) => {
    const { date: inputDate, time: inputTime, doctorId } = req.body;

    try {
        // Convert input date and time to ISO strings
        const date = moment(inputDate, 'DD-MM-YYYY').toISOString();
        const time = moment(inputTime, 'HH:mm').format('HH:mm'); // Format time for comparison

        // Retrieve doctor's available timings
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor || !doctor.timing || !Array.isArray(doctor.timing)) {
            return res.status(404).send({
                message: "Doctor not found or timing information missing",
                success: false
            });
        }

        const [availableStartTime, availableEndTime] = doctor.timing;
        if (!availableStartTime || !availableEndTime) {
            return res.status(400).send({
                message: "Doctor's available timing is not properly defined",
                success: false
            });
        }

        // Check if the given time is within the doctor's available hours
        if (time < availableStartTime || time > availableEndTime) {
            return res.status(200).send({
                message: "Appointment time is outside the doctor's available hours",
                success: false
            });
        }

        // Define time range (one hour before and after the provided time)
        const fromTime = moment(inputTime, 'HH:mm').subtract(1, 'hours').format('HH:mm');
        const toTime = moment(inputTime, 'HH:mm').add(1, 'hours').format('HH:mm');

        // Query to find any conflicting appointments
        const appointments = await appointmentModel.find({
            doctorId: doctorId,
            date: date,
            time: {
                $gte: fromTime,
                $lte: toTime
            }
        });

        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointment is not available at this time",
                success: false
            });
        } else {
            return res.status(200).send({
                message: "Appointment available",
                success: true
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in booking availability controller"
        });
    }
};


const userAppointmentsController = async(req,res)=>{
   try {
      const appointments= await appointmentModel.find({userId:req.body.userId})
      res.status(200).send({
         success:true,
         message:"Appointments fetched successfully",
         data:appointments,
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success:false,
         message:"Error in user appointment controller",

      })
   }

}
module.exports={loginController, 
   registerController, 
   authController, 
   getAllDoctorsController,
   bookAppointmentController,
   bookAvailableController,
   userAppointmentsController
};