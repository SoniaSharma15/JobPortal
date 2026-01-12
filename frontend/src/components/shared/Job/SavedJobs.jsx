import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { removeJob } from "@/redux/savedJobsSlice";
import { toast } from "sonner";

function SavedJobs() {
  const savedJobs = useSelector((state) => state.savedJobs);
  const dispatch = useDispatch();
  const Removehandler = (id) => {
    dispatch(removeJob(id));
    toast("Removed Successfully");
  };
  return (
    <div>
      {savedJobs.length > 0 ? (
        <h2 className="text-2xl font-bold my-2 px-4">Saved Jobs</h2>
      ) : (
        <h2 className="text-2xl font-bold my-2 px-4">No Jobs are Saved</h2>
      )}
      {Array.isArray(savedJobs) &&
        savedJobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded my-2 flex flex-col md:flex-row justify-between text-justify items-start  "
          >
            <div className="w-4/5">
              <h3 className="font-semibold">{job?.title}</h3>
              <p>{job.description}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => Removehandler(job?._id)}
              className="ml-4 mt-1"
            >
              Remove
            </Button>
          </div>
        ))}
    </div>
  );
}

export default SavedJobs;
