import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Eye } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminJobsTable() {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobsByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobsByText) {
          return true;
        }
        return (
          job?.title
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobsByText.toLowerCase())
        );
      });
    setFilterJobs(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="py-2">
      <Table>
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => {
            return (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className=" flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => {
                          navigate(`/admin/jobs/${job._id}`);
                        }}
                      >
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                      <div
                        className=" flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => {
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
