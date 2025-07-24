import React, { useEffect } from "react";
import Job from "../shared/Job/Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Filter jobs based on searchedQuery
  const filteredJobs = searchedQuery
    ? allJobs?.filter((job) =>
        job?.title?.toLowerCase().includes(searchedQuery.toLowerCase())
      )
    : allJobs;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl my-10">
        {searchedQuery
          ? `Search Results for "${searchedQuery}" (${filteredJobs?.length})`
          : `All Jobs (${filteredJobs?.length})`}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredJobs?.map((job) => (
          <Job key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Browse;