import express from "express";
import cookieParser from "cookie-parser";
import cors  from 'cors'
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js"
import ApplicationRoute from "./routes/application.route.js"
import connectCloudinary from "./utils/cloudinary.js";
dotenv.config({});
const app=express();
connectCloudinary()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions,({ origin: "https://your-frontend.vercel.app" })));

const PORT=process.env.PORT;

//api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute) 
app.use("/api/v1/job",JobRoute) ;
app.use("/api/v1/applications",ApplicationRoute) ;
 
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})  