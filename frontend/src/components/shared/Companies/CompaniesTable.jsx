import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from "@/components/ui/table";
import { Avatar,AvatarImage } from "@radix-ui/react-avatar";
import { Popover ,PopoverContent,PopoverTrigger} from "@/components/ui/popover";
import { Edit2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CompaniesTable() {
  const {companies,searchCompanyByText}=useSelector(store=>store.company)
  const [filterCompany,setFilterCompany]=useState(companies)
   const navigate=useNavigate();
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
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
        {filterCompany?.length<=0? <span>No Companies Available yet !</span>:
        ( 
          <>
        { filterCompany?.map((company)=>{
          return (
<TableRow key={company._id}> <TableCell>
              <Avatar>
                  <AvatarImage src={company.logo} className="h-10"/>
              </Avatar>
          </TableCell>
          <TableCell>
            {company.name}
          </TableCell>
          <TableCell>
                {company.createdAt.split("T")[0]}
          </TableCell>
          <TableCell className="text-right cursor-pointer">
                 <Popover>
                  <PopoverTrigger>
                      <MoreHorizontal/>
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className=" flex items-center gap-2 w-fit cursor-pointer" onClick={()=>{navigate(`/admin/companies/${company._id}`)
}}>
                      <Edit2 />  
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                 </Popover>
          </TableCell></TableRow>
          )
        })
      } 
          </>
    )
  } 
      </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
