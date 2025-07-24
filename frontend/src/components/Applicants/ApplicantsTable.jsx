import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { CheckCircle } from 'lucide-react';
import { XCircle } from 'lucide-react'
import axios from "axios";

const shortListingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const {applicants}=useSelector(store=>store.application)
   const statusHandler=async(status,id)=>{
    try {
     const res=await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
      withCredentials:true
     }) 
     if(res.data.success){
      toast.success(res.data.message)
     }
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
            {
           applicants && applicants?.applications?.map((item)=>{
            return(
<>         
<tr key={item.applicant?._id}>
<TableCell>{item.applicant?.fullname}</TableCell>
            <TableCell>{item.applicant?.email}</TableCell>
            <TableCell>{item.applicant?.phoneNumber}</TableCell>
            <TableCell>
              {item.applicant?.profile?.resumeOriginalName?
               <a className="text-blue-600 cursor-pointer " href={item.applicant?.profile?.resume}>{item.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>
              }</TableCell>
            <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
            <TableCell className="float-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {shortListingStatus.map((status, index) => {
                    return (
                      <div key={index} className="flex w-fit items-center my-2 cursor-pointer"
                      onClick={()=>statusHandler(status,item?._id)}
                      >
                      {(status==="Accepted")?<span className="mr-2"><CheckCircle color="green" size={24}/></span>:<span className="mr-2"><XCircle color="red" size={24} /></span>}  <span>{status}</span>
                      
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
</>)
              })
            }
           
        </TableBody>
      </Table>
    </>
  );
}

export default ApplicantsTable;
