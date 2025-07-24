import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveJob } from "@/redux/savedJobsSlice";




function Job({job}) {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt= new Date(mongodbTime);
    const currentTime= new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  const {companies,searchCompanyByText}=useSelector(store=>store.company)
  const [filterCompany,setFilterCompany]=useState(companies)
   useEffect(()=>{
   const filteredCompany=companies.length>=0 && companies.filter((company)=>{
    if(!searchCompanyByText){
      return true;
    }
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
   })
   setFilterCompany(filteredCompany)
   },[companies,searchCompanyByText])
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)===0? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark></Bookmark>
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 ">
        {console.log(job)}
        <div className="p-2">
          <Avatar>
            <AvatarImage
              src={`${filterCompany[0].logo}`}
              alt="@shadow"
              className="h-10 object-cover rounded"
            ></AvatarImage>
          </Avatar>
        </div>
            {/* <AvatarFallback>Logo</AvatarFallback> */}
        <div className="px-3">
          <h1 className="font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> {job?.title}</h1>
        <p className="text-sm text-gray-600">
{job?.description?.substring(0, 40) + '...'}
</p>
      </div>
      <div className="my-1"> 
        <Badge className={"text-blue-700 font-bold "} variant="ghost">
        {job?.position}Position
        </Badge>
        <Badge className={" text-[#F83002]  font-bold "} variant="ghost">
        {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold "} variant="ghost">
        {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={()=>{navigate(`/description/${job?._id}`)}}>Details</Button>
        <Button  className="bg-[#7209b7]" onClick={() => dispatch(saveJob(job))}>Save For Later</Button>
      </div>
    </div>
  );
}

export default Job;
