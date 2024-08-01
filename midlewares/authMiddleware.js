const jwt=require("jsonwebtoken");

module.exports = async(req,res,next) => 
{
    try {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader && authorizationHeader.split) {
        const token=req.headers['authorization'].split(" ")[1]; //getting the token 
        jwt.verify(token, process.env.JWT_SECRET, (error, decode)=>{  // verify the token using JWT
        if(error)
        {
           return res.status(200).send({message:"Authentication Failed",success:false});
        }
        else
        {
          req.body.userId=decode.id;
          next();
        }
        }           
      })
        
    } 
    catch(error)
    {
        console.log(error);
        res.status(401).send({message:`Error in controller ${error.message}`, success:false});
    }

}
