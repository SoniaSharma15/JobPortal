import { Job } from "../models/job.model.js";

//admin job posts
export const postJob=async(req,res)=>{
    try {
     const {title,description,requirements,salary,location,jobType,position,companyId,experience} =req.body;
     const userId=req.id;
     if(!title|| !description || !salary||!location||!jobType|| !position || !companyId)
{
    return res.status(400).json({
        message:"Something is done wrong",
        success:false
    })
}
   const job=await Job.create({
    title,
    description,
    requirements:requirements.split(","),
    salary:Number(salary),
    location,
    jobType,
    experienceLevel:experience,
    position, 
    company:companyId,
    created_by:userId
   })
 return res.status(201).json({
    message:"Job created successfully",
    job,
    success:true
})
    } catch (error) {
        console.log(error)
    }
}


//student search 
export const getAllJobs=async(req,res)=>{
try {
    const keyword=req.query.keyword || "";
    const query={
        $or:[
            {title:{$regex:keyword ,$options:"i"}},
            {description:{$regex:keyword ,$options:"i"}},
        ]
    }
    const jobs =await Job.find(query);
    if(!jobs){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        })
    }
    return res.status(200).json({
        jobs,
        success:true
    })
} catch (error) {
  console.log(error)  
}
}


//student 
export const getJobById=async(req,res)=>{
    try {
      const jobId= req.params.id;
      const job=await Job.findById(jobId).populate({
         path:"applications"
      })
      if(!job){
         return res.status(404).json({
            message:"Job not found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
} catch (error) {
        console.log(error)
    }
}

//admin kitne job create kra hai abhi tk

export const getAdminJobs=async(req,res)=>{
    try {
        const adminId =req.id;
        const jobs= await Job.find({created_by:adminId}).populate({
            path:'company'
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })  
    } catch (error) {
        console.log(error)
    }
}