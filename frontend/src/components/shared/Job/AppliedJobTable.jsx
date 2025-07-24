import React, { useEffect } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
const {allAppliedJobs}=useSelector(store=>store.job)
  return (
    <div>
      <Table>
        <TableCaption>A List of your applied Jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length<=0 ?<span>
            You haven't applied to any job yet.
          </span>:allAppliedJobs?.map((appliedJob) => {
            return <TableRow key={appliedJob?._id}>
              <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell className="text-right "><Badge className={`${appliedJob?.status==="rejected"?'bg-red-400':appliedJob?.status==='pending'?'bg-gray-400':'bg-green-400'}`} >{
         appliedJob?.status.toUpperCase() }</Badge></TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
