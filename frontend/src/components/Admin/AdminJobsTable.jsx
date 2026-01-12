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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Eye, Trash2Icon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function AdminJobsTable() {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
 const { allAdminJobs } = useSelector((store) => store.job);

useEffect(() => {
  const filteredJobs = allAdminJobs.filter((job) =>
    job?.company?.name?.toLowerCase().includes(searchCompanyByText?.toLowerCase() || '')
  );
  setFilterJobs(filteredJobs);
}, [allAdminJobs, searchCompanyByText]);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const handleDeleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  const navigate = useNavigate();

 
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
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }}
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                         <AlertDialog>
                            <AlertDialogTrigger>
                              <div className=" flex items-center gap-2 w-fit cursor-pointer ">
                                <span>
                                  <Trash2Icon className="text-red-500" />
                                </span>
                                <span>Delete</span>
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your Job and remove
                                  applicants related to this Job.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>{handleDeleteJob(job._id)}}>
                                  <Trash2Icon
                                    className="text-white "
                                  />
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
