import React from "react";
import { Carousel,CarouselItem,CarouselContent,CarouselNext,CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
];

function CategoryCarousel() {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const searchJobHandler=(query)=>{
   dispatch(setSearchedQuery(query));
   navigate("/browse")
 }

  return (
    <div>
      <Carousel className="w-[50%] md:w-full max-w-xl mx-auto my-20">
        <CarouselContent >
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}> 
              <Button variant="outline" className="rounded-full" onClick={()=>{searchJobHandler(cat)}}>{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
