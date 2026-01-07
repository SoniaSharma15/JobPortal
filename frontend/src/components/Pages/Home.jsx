import React from "react";
import HeroicSection from "../shared/Home/HeroicSection";
import CategoryCarousel from "../shared/Home/CategoryCarousel";
import LatestJobs from "../shared/Home/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Home() {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <HeroicSection />
      <CategoryCarousel />
      <LatestJobs />
    </>
  );
}

export default Home;
