import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

import { filterData } from "./filterData";

function FilterCard() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const handleCheckboxChange = (type, value) => {
    setSelectedFilters(prev => {
      const current = prev[type] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    dispatch(setSearchedQuery("Clear Filter"));
  };

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      dispatch(setSearchedQuery({ filters: selectedFilters }));
    }
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white px-6 py-4 rounded-md overflow-y-scroll h-[500px]">
      <h1 className="font-bold text-lg mb-2">Filter Jobs</h1>
      <hr className="mb-4" />

      <button
        onClick={clearAllFilters}
        className="text-sm text-blue-600 underline mb-4"
      >
        Clear All Filters
      </button>

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-md mb-2">{data.filterType}</h2>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div className="flex items-center space-x-2 mb-2" key={itemId}>
                <Checkbox
                  id={itemId}
                  checked={selectedFilters[data.filterType]?.includes(item) || false}
                  onCheckedChange={() => handleCheckboxChange(data.filterType, item)}
                />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default FilterCard;