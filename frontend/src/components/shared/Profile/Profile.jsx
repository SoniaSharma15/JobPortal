import React, { useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../ui/button";
import { Mail, Contact, Pen } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label";
import { Link } from "react-router-dom";
import AppliedJobTable from "../Job/AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAllAppliedJob";
const isResume=true;
function Profile() {
  useGetAppliedJob();
  const [open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);
  return (<>
     <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.profile?.profilePhoto}
              alt="logo"
              className="max-w-20"
            />
          </Avatar>

          <div>
            <h1 className="font-medium text-lg mb-1">{user?.fullname}</h1>
            <h1>
           {user?.profile?.bio}
            </h1>
          </div>
          <Button className="text-right" variant="outline" onClick={()=>{setOpen(true)}}>
            <Pen />
          </Button>
        </div>

        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>{user?.phoneNumber}</span>
        </div>
        <div className="my-4">
          <h1 className="font-medium">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

   <div className="grid w-full max-w-sm items-center gap-1.5 ">
    <Label className="text-md font-bold">Resume</Label>
    {isResume? <Link to={"https://youtube.com"}className="text-blue-500 w-full hover:underline hover:cursor-pointer">{user.profile.resumeOriginalName}</Link>:<span>NA</span>}
   </div>
      </div>
    </div>
     <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>

  );
}

export default Profile;
