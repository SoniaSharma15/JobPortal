import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import {USER_API_END_POINT} from "../../../utils/constant.js"
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice.js";

function UpdateProfileDialog({ open, setOpen }) {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);

  const {user}=useSelector(store=>store.auth);
  const [input,setInput]=useState({
    fullName:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills.map(skill=>skill),
    file:user?.profile?.resume
  })
  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

const fileChangeHandler=(e)=>{
  const file=e.target.files?.[0];
  setInput({...input,file})
}

  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("bio",input.bio)
    formData.append("skills",input.skills)

    if(input.file){
      formData.append("file",input.file);
    }
    try{
      setLoading(true);
      const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });   
      if (res.data.success){
      dispatch(setAuthUser(res.data.user));
      setLoading(false)
       toast.success(res.data.message);
     }
     }
    catch(error){
      toast.error(error?.response?.data?.message);
    }
    setOpen(false)
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form    onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
           
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Name
                </Label>
                <Input onChange={changeEventHandler} value={input.fullName} id="fullName" name="fullName" className="col-span-3" type="text"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                 Email
                </Label>
                <Input onChange={changeEventHandler} value={input.email} id="email" name="email" className="col-span-3" type="email" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                 Number
                </Label>
                <Input onChange={changeEventHandler} value={input.phoneNumber} id="phoneNumber" name="phoneNumber" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                Bio
                </Label>
                <Input value={input.bio} id="bio" name="bio" className="col-span-3"  onChange={changeEventHandler}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                Skills
                </Label>
                <Input onChange={changeEventHandler} value={input.skills} id="skills" name="skills" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                Resume
                </Label>
                <Input  onChange={fileChangeHandler} id="file" name="file" className="col-span-3" type="file" accept="application/pdf"/>
              </div>
            </div>
            <DialogFooter>
            {
            loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait !</Button>:  <Button type="submit" className="w-full my-4">
            Update
          </Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
