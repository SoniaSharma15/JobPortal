import React, { useEffect, useState } from "react";
import FilterCard from "../shared/Job/FilterCard";
import Job from "../shared/Job/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ArrowLeftFromLineIcon,
  ChartBarIncreasingIcon,
} from "lucide-react";
import { Button } from "../ui/button";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filter, setFilter] = useState(allJobs);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    // Handle "Clear Filter"
    if (searchedQuery === "Clear Filter") {
      setFilter(allJobs);
      return;
    }

    // Handle keyword search (string)
    if (typeof searchedQuery === "string") {
      const keyword = searchedQuery.toLowerCase();
      const filtered = allJobs.filter((job) => {
        const title = job.title?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";
        return (
          title.includes(keyword) ||
          location.includes(keyword) ||
          description.includes(keyword)
        );
      });
      setFilter(filtered);
      return;
    }

    // Handle structured filter (object)
    if (typeof searchedQuery === "object" && searchedQuery !== null) {
      const selectedIndustries = searchedQuery?.filters?.Industry || [];
      const selectedLocations = searchedQuery?.filters?.Location || [];
      const [minSalary, maxSalary] = searchedQuery?.salary || [0, 100];

      const filtered = allJobs.filter((job) => {
        const jobTitle = job.title?.toLowerCase() || "";
        const jobLocation = job.location?.toLowerCase() || "";
        const jobSalary = job.salary || 0;

        const matchesIndustry =
          selectedIndustries.length === 0 ||
          selectedIndustries.some((ind) =>
            jobTitle.includes(ind.toLowerCase())
          );

        const matchesLocation =
          selectedLocations.length === 0 ||
          selectedLocations.some((loc) =>
            jobLocation.includes(loc.toLowerCase())
          );

        const matchesSalary =
          jobSalary >= minSalary * 1000 && jobSalary <= maxSalary * 1000;

        return matchesIndustry && matchesLocation && matchesSalary;
      });

      setFilter(filtered);
      return;
    }

    // Default fallback
    setFilter(allJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5  mx-5 flex-col md:flex-row relative">
        <Button onClick={() => setOpenFilter(!openFilter)}>
          {openFilter ? <ArrowLeftFromLineIcon /> : 
          <span className="flex align-center gap-4"><ChartBarIncreasingIcon /> Filters </span>}
        </Button>

        <div
          className={`w-20% absolute top-16 md:-left-16 p-30 ${
            openFilter ? "block" : "hidden"
          }`}
        >
          <FilterCard />
        </div>

        {/* Job Cards */}
        {filter?.length <= 0 ? (
          <span className="text-medium space-x-2">Job Not Found</span>
        ) : (
          <div className="flex-1 overflow-y-auto pb-5">
            <div className="grid md:grid-cols-3 sm:gap-4">
              {filter.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}
                >
                  <Job job={job} />
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