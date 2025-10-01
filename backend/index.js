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
import notificationRoutes from './routes/notificationRoutes.js';
dotenv.config({});
const app=express();
connectCloudinary()
//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// const corsOptions = {
//   // origin: ["http://localhost:5173", "https://job-portal-sonia-sharmas-projects.vercel.app"],
//   origin: ["https://job-portal-sonia-sharmas-projects.vercel.app"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-sonia-sharmas-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


const PORT=process.env.PORT;

//api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute) 
app.use("/api/v1/job",JobRoute) ;
app.use("/api/v1/applications",ApplicationRoute) ;
 

app.use('/api/v1/notifications', notificationRoutes);

connectDB();
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})  