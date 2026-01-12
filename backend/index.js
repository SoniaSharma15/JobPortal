import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import chatRoutes from "./routes/chat.route.js";
import cors from 'cors';
dotenv.config({});
const app=express();
//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
         "http://localhost:5173",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

const PORT=process.env.PORT;

//api's
app.use('/api/chat', chatRoutes);
app.get("/", (req, res) => {
  res.send("ERP Chatbot Backend (Module Based) Running");
});
connectDB();
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})  