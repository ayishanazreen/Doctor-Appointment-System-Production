const  mongoose=require("mongoose");

const connectDb = async()=> {
    try {
       await mongoose.connect(process.env.MONGODB_URL); 
       console.log(`database connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection issue ${error}`);
    }

}
module.exports=connectDb;