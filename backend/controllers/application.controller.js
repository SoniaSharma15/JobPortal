import {Application} from "../models/application.model.js"
import { Job } from "../models/job.model.js";
import { sendEmail } from "../utils/emailService.js";
import { User } from "../models/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this Job",
        success: false
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // Create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    job.applications.push(newApplication._id);
    await job.save();

    // Get user email
    const user = await User.findById(userId);
    if (user?.email) {
     await sendEmail(
  user.email,
  'Your Job Application Has Been Received',
  `
Dear ${user.fullname},

Thank you for applying for the position of "${job.title}" on our platform.

We have successfully received your application and it is currently under review by the hiring team. If your profile aligns with the job requirements, you will be contacted for the next steps.

Here are the details of the job you applied for:

─────────────────────────────────────────────
📌 Job Title: ${job.title}  
📍 Location: ${job.location}  
📝 Description: ${job.description}  
✅ Requirements: ${job.requirments.join(', ')}  
💰 Salary: ₹${job.salary}Lakh per annum
─────────────────────────────────────────────

In the meantime, feel free to explore other opportunities on our portal or update your profile to improve your chances.

We appreciate your interest and wish you the very best in your job search.

Warm regards,  
The Job Portal Team
`
);
    }

    return res.status(201).json({
      message: "Job applied successfully and confirmation email sent.",
      success: true
    });
  } catch (error) {
    console.log('Apply Job Error:', error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false
    });
  }
};
//user can see all the jobs he had applied
export const getAppliedJobs=async(req,res)=>{
    try {
       const userId=req.id;
       const application=await Application.find({
        applicant:userId}).sort({createdAt:-1}).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
              path: 'company',
              options: { sort: { createdAt: -1 } }
            }
        })        
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
//admin can see how many candidates had applied
export const getApplicants=async(req,res)=>{
try {
   const jobId=req.params.id;
   

const job = await Job.findById(jobId)
  .populate({
    path: 'applications',
    options: { sort: { createdAt: -1 } },
    populate: {
      path: 'applicant'
    }
  })
  .populate('company')


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

export const updateStatus=async(req,res)=>{
    try {
     const {status}=req.body;
     const applicationId=req.params.id; 
     if(!status){
        return res.status(400).json({
            message:"status is required",
            success:false
        })
     }
    // find the application by applicantId
    const application=await Application.findOne({_id:applicationId})
    if(!application){
        return res.status(404).json({
            message:"Application not found",
            success:false
        })
    }
    //update the status
    application.status=status.toLowerCase();
   await application.save();
return res.status(200).json({
    message:"Status Updated Successfully",
    success:true,
})

    } catch (error) {
        console.log(error)
    }
}
