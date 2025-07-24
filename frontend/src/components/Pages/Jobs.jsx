import React, { useEffect, useState } from "react";
import FilterCard from "../shared/Job/FilterCard";
import Job from "../shared/Job/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Jobs() {
  const {allJobs,searchedQuery}=useSelector(store=>store.job)
  const [filter,setFilter]=useState(allJobs);
  useEffect(() => {
      if(searchedQuery){
const filter=allJobs.filter((job)=>{
  return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase())
})
setFilter(filter)
      }
      else{
        setFilter(allJobs)
      }
  }, [allJobs,searchedQuery])
  
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-20% ">
          <FilterCard />
        </div>
        {/* JOb Card */}
        {filter?.length <= 0 ? (
          <span className="text-medium space-x-2">Job Not Found</span>
        ) : (
          <div className="flex-1 overflow-y-auto pb-5">
            <div className="grid md:grid-cols-3 sm:gap-4">
            {filter.map((job ) => (
             <motion.div 
             initial={{opacity:0,x:100}}
             animate={{opacity:1,x:0}}
             exit={{opacity:0,x:-100}}
             transition={{duration:0.3}}
             key={job?._id}>
                 <Job  job={job}/>
              </motion.div>     
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
