import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { removeJob } from "@/redux/savedJobsSlice";
import { toast } from "sonner";

function SavedJobs() {
  const savedJobs = useSelector(state => state.savedJobs);
  const dispatch = useDispatch();
 const Removehandler=(id)=>{
dispatch(removeJob(id));
toast("Removed Successfully")
 }
  return (
    <div>
      <h2 className="text-2xl font-bold">Saved Jobs</h2>
   { Array.isArray(savedJobs) && savedJobs.map(job => (
        <div key={job._id} className="border p-4 rounded my-2">
          <h3 className="font-semibold">{job.title}</h3>
          <p>{job.description}</p>
          <Button
            variant="destructive"
            onClick={()=>Removehandler(job._id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;