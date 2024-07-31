const User=require('../models/userModel');


const getAllNotificationController = async(req,res) => {
   try{
    const user=await User.findOne({_id:req.body.userId});
    const seennotification=user.seennotification;
    const notification=user.notification;
    seennotification.push(...notification);
    user.notification=[];
    user.seennotification=notification;
    const updatedUser= await user.save();
    res.status(200).send({
        success:true,
        message:"All notifications marked as read.",
        data:updatedUser,
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"error in getting notification",
        success:false,
        error
    })
  }
}

const deleteAllNotificationController = async(req,res) => {
  try{
    const user=await User.findOne({_id:req.body.userId});
    user.notification = [];
    user.seennotification = [];
    const updatedUser= await user.save();
    res.status(200).send({
      success:true,
      message:"read notifications are cleared successfully",
      data:updatedUser,
    })

  }
  catch(error)
  {
    console.log(error);
    res.status(500).send({
        message:"error in deleting notification",
        success:false,
        error
    })
  }
};

module.exports = {getAllNotificationController, deleteAllNotificationController};
