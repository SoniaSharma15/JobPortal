import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  const navigate=useNavigate();
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="font-bold text-4xl">
        <span className="text-[#6a38c2]">Latest & Top </span>Job Openings
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 my-10">
        {allJobs?.length <= 0 ? (
          <span className="text-center text-lg font-semibold">
            No Job Available
          </span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards onClick={()=>navigate(`/description/${job._id}`)} key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
