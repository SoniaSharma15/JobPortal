import React, { useState } from "react";
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  // {
  //   filterType: "All",
  //   array: ["All"],
  // },
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai","Lucknow"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","MEAN" ,"MERN"],
  },
  { filterType: "salary", array: ["0-40k", "40k-1Lakh", "1Lakh-5Lakh"] },
];

function FilterCard() {
  const [selectedValue,setSelectedValue]=useState("");
  const filterHandler=(value)=>{
setSelectedValue(value);
}
const dispatch=useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])
  
  return (<>
    <div className="w-full bg-white p-3 rounded-md ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={filterHandler} className="flex  md:flex-col">
      {filterData.map((data, index) => {
        return (
          <div key={index} >
            <h1 className="font-bold text-sm md:text-lg">{data?.filterType}</h1>
            {data?.array.map((item,idx)=>{
              const itemId=`id${index}-${idx}`
              return (
                <div className="flex items-center space-x-2 my-2" key={idx}>
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              )
            })}
          </div>
        );
      })}
      </RadioGroup>
    </div>
    </>
  );
}

export default FilterCard;
