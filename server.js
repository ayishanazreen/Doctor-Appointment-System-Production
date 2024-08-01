const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
const path=require('path');

//config
dotenv.config();

//mongoDB connection
connectDb();


//middlewares
app.use(express.json());
app.use(cors());

//routers
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'));
app.use('/api/doctors',require('./routes/doctorRoutes'));

//static files
app.use(express.static(path.join(__dirname, './Client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './Client/build/index.html'))
})
const port = process.env.PORT || 4002;
//listen port
app.listen(port,()=>{
    console.log(`server running on PORT, ${port}`);
})

