import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
function CompanySetup() {
  const params=useParams();

  useGetCompanyById(params.id)

    const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

const {singleCompany}=useSelector(store=>store.company)
const [loading,setLoading]=useState();
const navigate=useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file=e.target.files?.[0];
    setInput({ ...input,file});
  };
  const submitEvent=async(e)=>{
e.preventDefault();
const formData=new FormData();
formData.append("name",input.name)
formData.append("description",input.description)
formData.append("location",input.location)
formData.append("website",input.website)
if(input.file){ 
formData.append("file",input.file)
}
try {
  setLoading(true)
  const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    },
    withCredentials:true
  })
  if(res?.data?.success){
    toast.success(res?.data?.message)
    setLoading(false);
    navigate("/admin/companies")
  }
} catch (error) {
  console.log(error)
  toast.error(error.message)
  setLoading(false)
}
}
console.log(singleCompany)
useEffect(() => {
  
  setInput({
    name: singleCompany?.name || "",
    description: singleCompany?.description ||"",
    website: singleCompany?.website || "",
    location: singleCompany?.location ||"",
    file: singleCompany?.file || null,
  })
}, [singleCompany])

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={submitEvent}>
        <div className="flex items-center gap-5 p-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold " onClick={()=>{
              navigate("/admin/companies")
            }}
          >
            <ArrowLeft /> <span>Back</span>
          </Button>

          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>
        </div>
    {
(loading)?(<Button type="submit" className="w-full mt-8">Please Wait !</Button>):(
  <Button type="submit" className="w-full mt-8">Update</Button>
)
    } 
      </form>
    </div>
  );
}

export default CompanySetup;
