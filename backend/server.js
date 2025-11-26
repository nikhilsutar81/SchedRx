import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongodb.js';
import connectCloudinary from './Config/cloudinary.js';
import adminRouter from './Routes/adminRoute.js';
import doctorRouter from './Routes/doctorRoute.js';
import userRouter from './Routes/userRoute.js';

//app config
const app = express()
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//Api EndPoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=> console.log("Server Working on PORT:",port))