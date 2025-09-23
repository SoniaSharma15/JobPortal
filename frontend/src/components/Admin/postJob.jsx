import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger, SelectValue } from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
const companyArray=[];


function postJob() {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

const [loading,setLoading]=useState(false)
const navigate=useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
const {companies}=useSelector(store=>store.company)

const selectChangeHandler=(value)=>{
    const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value)
    setInput({...input,companyId:selectedCompany._id})
}

  const submitHandler=async(e)=>{
     e.preventDefault();
     try {
      setLoading(true)
       const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
       })
       if(res.data.success){
        toast.success(res.data.message);
       navigate("/admin/jobs")
       }
     } catch (error) {
      console.log(error)
     }
     finally{
      setLoading(false);
     }
  }

  return (
    <div className="flex items-center justify-center w-screen my-5">
      <form action="" className="p-10 max-w-4xl border border-gray-200 shadow-lg-rounded-md" onSubmit={submitHandler}>
      <div className="grid grid-cols-2 gap-3">      
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.title}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          type="text"
          name="description"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.description}
        />
      </div>
      <div>
        <Label>Requirements</Label>
        <Input
          type="text"
          name="requirements"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.requirements}
        />
      </div>
      <div>
        <Label>Salary</Label>
        <Input
          type="text"
          name="salary"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.salary}
        />
      </div>
      <div>
        <Label>Job Type</Label>
        <Input
          type="text"
          name="jobType"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.jobType}
        />
      </div>
      <div>
        <Label>Location</Label>
        <Input
          type="text"
          name="location"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.location}
        />
      </div>
      <div>
        <Label>Experience Level</Label>
        <Input
          type="text"
          name="experience"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.experience}
        />
      </div>
      <div>
        <Label>No. of Positions</Label>
        <Input
          type="number"
          name="position"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
          onChange={changeEventHandler}
          value={input.position}
        />
      </div> 
        
      </div>
      <div>
      {
        companies.length>0 &&(
            <Select onValueChange={selectChangeHandler}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-slate-200 shadow-lg-rounded-md p-1">
                {companies.map((company)=>{
                   return <SelectItem key={company?._id} value={company?.name.toLowerCase()}>{company?.name}</SelectItem>
                })}
              
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }    
      </div>
      {
        loading?<Button className="w-full my-4">  
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please Wait !</Button>:<Button className="w-full mt-4">Post new Job</Button>
      } 
{
    companyArray.length<0 &&<p className="text-xs font-bold text-red-700 text-center my-3">* Please register a company before posting a Jobs*</p>
}

      </form>
    </div>
  );
}

export default postJob;
