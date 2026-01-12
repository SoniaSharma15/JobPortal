import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="pl-5 font-bold text-4xl">
        <span className=" text-[#6a38c2]">Latest & Top </span>Job Openings
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 my-10 hover:cursor-pointer">
        {allJobs?.length <= 0 ? (
          <span className="text-center text-lg font-semibold">
            No Job Available
          </span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
