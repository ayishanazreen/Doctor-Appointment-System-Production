const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const doctorSchema=new Schema(
    { 
    userId: 
        {
          type:String, 
        },
    firstName: 
        {
          type:String, 
          required:[true,"first name is required"]
        },
     lastName: 
        {
         type:String, 
         required:[true,"last name is required"]
        },
      email:
       {
         type:String, 
         required:[true,"email is required"]
        },
      website: 
       {
          type:String
       },
       address:
       {
         type:String,
         required:[true,"address is required"]
       },
       phone: 
        {
           type:String, 
           required:[true,"Phone no is required"]
        },
      specialization:
       {
          type:String, 
          required: [true,"specialization is required"]
       },
       experience:
       {
          type:String, 
          required: [true,"experience is required"]
       },
       feesPerConsultation:
       {
        type:Number,
        required:[true, "fees is required"]
       },
       status:
       {
        type: String,
        default:"Pending"
       },
       timing:
       {
        type:Object,
        required:[true, "work timing is required"]
       }
}, 
{
    timestamps:true
}
);

const doctorModel=mongoose.model('doctors',doctorSchema);

module.exports=doctorModel;