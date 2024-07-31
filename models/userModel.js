const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userModelSchema=new Schema({
    name: 
    {   type:String, 
        required:[true,'name is required']
    },
    email:
     {   type:String,
         required:[true, 'email is required'] 
     },
    password: 
    { 
        type:String, 
        required:[true,'passowrd is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    },
});

const userModel=mongoose.model('User', userModelSchema);

module.exports=userModel;